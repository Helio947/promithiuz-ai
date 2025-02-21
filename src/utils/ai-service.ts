
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use the browser
env.allowLocalModels = false;
env.useBrowserCache = false;

let textGenerator: any = null;

export const initializeAI = async () => {
  if (!textGenerator) {
    try {
      console.log('Initializing AI model...');
      textGenerator = await pipeline(
        'text-generation',
        'Xenova/gpt2',  // Using GPT-2 which is supported in browser
        { device: 'cpu' }  // Using CPU as fallback since WebGPU might not be supported
      );
      console.log('AI model initialized successfully');
    } catch (error) {
      console.error('Error initializing AI:', error);
      throw error;
    }
  }
  return textGenerator;
};

export const generateAIResponse = async (prompt: string) => {
  try {
    const generator = await initializeAI();
    const response = await generator(prompt, {
      max_new_tokens: 100,
      temperature: 0.7,
      repetition_penalty: 1.2,
    });
    return response[0].generated_text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  const prompt = `Analyze this business and provide practical AI implementation suggestions: "${businessDescription}". Focus on actionable insights.`;
  return generateAIResponse(prompt);
};

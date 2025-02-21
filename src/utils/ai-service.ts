
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
        'Xenova/LaMini-Flan-T5-783M',
        { device: 'webgpu' }
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
      max_new_tokens: 200,
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
  const prompt = `As Promithiuz AI, analyze this business and provide practical AI implementation suggestions: "${businessDescription}". Focus on actionable insights and specific AI tools that could help.`;
  return generateAIResponse(prompt);
};

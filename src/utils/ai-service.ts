
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
        { 
          device: 'cpu',  // Using CPU as fallback since WebGPU might not be supported
          quantized: false // Disable quantization for better compatibility
        }
      );
      console.log('AI model initialized successfully');
    } catch (error) {
      console.error('Error initializing AI:', error);
      throw new Error('Failed to initialize AI model. Please try again.');
    }
  }
  return textGenerator;
};

export const generateAIResponse = async (prompt: string) => {
  if (!prompt.trim()) {
    throw new Error('Please provide a business description.');
  }

  try {
    const generator = await initializeAI();
    console.log('Generating response for prompt:', prompt);
    
    const response = await generator(prompt, {
      max_new_tokens: 150,
      temperature: 0.7,
      repetition_penalty: 1.2,
      do_sample: true,
      top_k: 50,
      top_p: 0.9,
    });
    
    console.log('Generated response:', response);
    return response[0].generated_text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to analyze business. Please try again.');
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  const prompt = `Business Analysis:
Business: "${businessDescription}"

Please provide specific AI implementation suggestions and practical insights for this business. Focus on:
1. Process automation opportunities
2. Customer service improvements
3. Cost reduction strategies
4. Revenue growth potential

Analysis:`;
  
  return generateAIResponse(prompt);
};

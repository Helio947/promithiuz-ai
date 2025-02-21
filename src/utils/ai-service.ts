
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use the browser
env.allowLocalModels = false;
env.useBrowserCache = false;

let textGenerator: any = null;

export const initializeAI = async () => {
  if (!textGenerator) {
    try {
      console.log('Initializing AI model...');
      
      // Try WebGPU first, fall back to WASM if not available
      const device = 'webgpu';
      
      textGenerator = await pipeline(
        'text-generation',
        'distilgpt2',  // Using a smaller model that's more likely to work in browser
        { 
          device
        }
      );
      console.log('AI model initialized successfully');
    } catch (error) {
      console.error('Detailed initialization error:', error);
      try {
        console.log('Falling back to WASM...');
        textGenerator = await pipeline(
          'text-generation',
          'distilgpt2',
          { 
            device: 'wasm'
          }
        );
        console.log('Successfully initialized with WASM');
      } catch (fallbackError) {
        console.error('Fallback initialization error:', fallbackError);
        throw new Error(`Failed to initialize AI model: ${error.message}`);
      }
    }
  }
  return textGenerator;
};

export const generateAIResponse = async (prompt: string) => {
  if (!prompt.trim()) {
    throw new Error('Please provide a business description.');
  }

  try {
    console.log('Starting to generate response...');
    const generator = await initializeAI();
    console.log('Model initialized, generating with prompt:', prompt);
    
    const response = await generator(prompt, {
      max_length: 200,  // Set absolute length instead of relative tokens
      temperature: 0.7,
      do_sample: true,
      top_k: 50,
    });
    
    console.log('Raw model response:', response);
    
    if (!response || !response[0] || !response[0].generated_text) {
      throw new Error('Model returned invalid response format');
    }
    
    return response[0].generated_text;
  } catch (error) {
    console.error('Detailed generation error:', error);
    throw new Error(`Failed to analyze business: ${error.message}`);
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  const prompt = `Analyze this business: "${businessDescription}". 
Provide specific suggestions for:
- Process automation
- Customer service
- Cost reduction
- Revenue growth`;
  
  try {
    console.log('Starting business analysis...');
    const result = await generateAIResponse(prompt);
    console.log('Analysis completed successfully');
    return result;
  } catch (error) {
    console.error('Business analysis failed:', error);
    throw error;
  }
};

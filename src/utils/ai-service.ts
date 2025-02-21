
import { toast } from "@/components/ui/use-toast";
import { pipeline } from "@huggingface/transformers";

let model: any = null;

const initModel = async () => {
  if (!model) {
    try {
      console.log('Initializing text generation model...');
      model = await pipeline(
        'text-generation',
        'Xenova/distilgpt2'  // This is a lightweight model suitable for browser
      );
      console.log('Model initialized successfully');
    } catch (error) {
      console.error('Model initialization failed:', error);
      throw error;
    }
  }
  return model;
};

export const generateAIResponse = async (prompt: string) => {
  if (!prompt.trim()) {
    throw new Error('Please provide a business description.');
  }

  try {
    console.log('Starting to generate response...');
    const generator = await initModel();
    
    const result = await generator(prompt, {
      max_length: 100,
      num_return_sequences: 1
    });

    console.log('Generation completed');
    return result[0].generated_text;
  } catch (error) {
    console.error('Generation error:', error);
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive"
    });
    throw error;
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  const prompt = `Analyze this business: "${businessDescription}". 
Suggest:
- Automation opportunities
- Service improvements
- Cost savings strategies

Analysis:`;
  
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

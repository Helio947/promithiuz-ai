
import { toast } from "@/components/ui/use-toast";
import { pipeline } from "@huggingface/transformers";

let model: any = null;

const initModel = async () => {
  if (!model) {
    try {
      console.log('Initializing text generation model...');
      model = await pipeline(
        'text-generation',
        'gpt2'  // Using GPT-2 for better text generation
      );
      console.log('Model initialized successfully');
    } catch (error) {
      console.error('Model initialization failed:', error);
      toast({
        title: "Error",
        description: "Failed to initialize AI model. Please try again.",
        variant: "destructive"
      });
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
      max_length: 150,
      num_return_sequences: 1,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.9,
      do_sample: true
    });

    console.log('Generation completed:', result);
    
    // Clean up the generated text by removing the input prompt
    const generatedText = result[0].generated_text.slice(prompt.length).trim();
    
    return generatedText;
  } catch (error) {
    console.error('Generation error:', error);
    toast({
      title: "Error",
      description: "Failed to generate response. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  const prompt = `As Promithiuz AI, analyze this business and provide practical advice: "${businessDescription}"

Key recommendations:
1. Automation opportunities
2. Service improvements
3. Cost reduction strategies

Analysis:`;
  
  try {
    console.log('Starting business analysis...');
    const result = await generateAIResponse(prompt);
    console.log('Analysis completed successfully');
    return result;
  } catch (error) {
    console.error('Business analysis failed:', error);
    toast({
      title: "Error",
      description: "Failed to analyze business. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};


import { toast } from "@/components/ui/use-toast";

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

export const generateAIResponse = async (prompt: string) => {
  if (!prompt.trim()) {
    throw new Error('Please provide a business description.');
  }

  const apiKey = localStorage.getItem('OPENAI_API_KEY');
  
  if (!apiKey) {
    toast({
      title: "API Key Required",
      description: "Please enter your OpenAI API key in the settings.",
      variant: "destructive"
    });
    throw new Error('OpenAI API key is required');
  }

  try {
    console.log('Starting to generate response...');
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are a business analyst AI that provides concise, practical advice."
        }, {
          role: "user",
          content: prompt
        }],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
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
Keep it brief and suggest:
- Automation opportunities
- Service improvements
- Cost savings strategies`;
  
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

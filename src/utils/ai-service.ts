
import { toast } from "@/components/ui/use-toast";

const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export const generateAIResponse = async (prompt: string) => {
  if (!prompt.trim()) {
    throw new Error('Please provide a business description.');
  }

  const apiKey = localStorage.getItem('GOOGLE_AI_API_KEY');
  
  if (!apiKey) {
    toast({
      title: "API Key Required",
      description: "Please enter your Google AI API key in the settings.",
      variant: "destructive"
    });
    throw new Error('Google AI API key is required');
  }

  try {
    console.log('Starting to generate response...');
    
    const response = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
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

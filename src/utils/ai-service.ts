
import { toast } from "@/components/ui/use-toast";

export const generateAIResponse = async (prompt: string) => {
  // Simple response generation logic
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Based on your input, here are some AI-powered insights:
1. Consider implementing mobile ordering to reduce wait times
2. Explore eco-friendly packaging options
3. Analyze peak hours to optimize staffing
4. Track inventory more efficiently using AI-powered systems
5. Implement a loyalty program to increase customer retention`);
    }, 1500); // Simulate API delay
  });
};

export const generateBusinessInsights = async (businessDescription: string) => {
  if (!businessDescription.trim()) {
    throw new Error('Please provide a business description.');
  }

  if (businessDescription.length < 10) {
    throw new Error('Please provide more details about your business for better analysis.');
  }

  try {
    console.log('Starting business analysis...');
    const prompt = `Analyzing business: "${businessDescription}"

Key focus areas:
1. Automation opportunities
2. Cost reduction
3. Customer experience
4. Market expansion
5. Technology integration

Analysis:`;
    
    const result = await generateAIResponse(prompt);
    console.log('Analysis completed successfully');
    return result;
  } catch (error) {
    console.error('Business analysis failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze business. Please try again.';
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
    throw error;
  }
};

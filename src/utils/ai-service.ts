import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const analyzeBusinessDescription = (description: string) => {
  // Extract key business elements from the description
  const keywords = description.toLowerCase().split(' ');
  
  // Basic business type detection
  const businessTypes = {
    restaurant: ['restaurant', 'food', 'cafe', 'dining', 'menu', 'chef', 'kitchen'],
    retail: ['shop', 'store', 'retail', 'sales', 'products', 'inventory'],
    service: ['service', 'consulting', 'agency', 'professional'],
    tech: ['software', 'tech', 'digital', 'online', 'app', 'website'],
  };

  // Determine business type
  let detectedType = 'general';
  for (const [type, indicators] of Object.entries(businessTypes)) {
    if (indicators.some(word => keywords.includes(word))) {
      detectedType = type;
      break;
    }
  }

  // Generate insights based on business type and description length
  const insights = {
    restaurant: [
      "Implement online ordering to increase revenue",
      "Analyze peak hours to optimize staffing",
      "Use inventory management software to reduce waste",
      "Create a loyalty program for repeat customers",
      "Consider delivery partnerships to expand reach"
    ],
    retail: [
      "Implement inventory tracking system",
      "Develop an online presence",
      "Create targeted marketing campaigns",
      "Optimize store layout for better flow",
      "Set up a customer feedback system"
    ],
    service: [
      "Automate appointment scheduling",
      "Implement CRM system for client management",
      "Develop service packages",
      "Create case studies from successful projects",
      "Set up referral program"
    ],
    tech: [
      "Implement agile methodologies",
      "Set up automated testing",
      "Create comprehensive documentation",
      "Establish a clear product roadmap",
      "Implement user feedback loops"
    ],
    general: [
      "Create a digital marketing strategy",
      "Implement customer feedback systems",
      "Analyze market competition",
      "Optimize operational efficiency",
      "Develop employee training programs"
    ]
  };

  return insights[detectedType as keyof typeof insights];
};

export const generateAIResponse = async (prompt: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-business', {
      body: { prompt }
    });

    if (error) throw error;
    return data.generatedText;
  } catch (error) {
    console.log('Falling back to local analysis due to:', error);
    // Fallback to local analysis if API fails
    const relevantInsights = analyzeBusinessDescription(prompt);
    return `Based on your business description, here are tailored recommendations:\n\n${relevantInsights.map((insight, index) => `${index + 1}. ${insight}`).join('\n')}`;
  }
};

export const generateBusinessInsights = async (businessDescription: string) => {
  if (!businessDescription.trim()) {
    throw new Error('Please provide a business description.');
  }

  if (businessDescription.length < 10) {
    throw new Error('Please provide more details about your business for better analysis (minimum 10 characters).');
  }

  try {
    console.log('Starting business analysis...');
    console.log('Analyzing business description:', businessDescription);
    
    const result = await generateAIResponse(businessDescription);
    
    console.log('Analysis completed successfully');
    console.log('Generated insights:', result);
    
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

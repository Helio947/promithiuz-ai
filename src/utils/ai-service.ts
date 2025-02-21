
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
      "Analyzing your restaurant business...",
      "I recommend implementing online ordering to increase revenue.",
      "You should analyze peak hours to optimize staffing.",
      "Consider using inventory management software to reduce waste.",
      "A loyalty program could help retain repeat customers.",
      "Exploring delivery partnerships could expand your reach significantly."
    ],
    retail: [
      "Looking at your retail business...",
      "An inventory tracking system would be beneficial for your operations.",
      "Developing an online presence should be a priority.",
      "Creating targeted marketing campaigns could boost sales.",
      "Optimizing your store layout could improve customer flow.",
      "Implementing a customer feedback system would help improve service."
    ],
    service: [
      "Analyzing your service-based business...",
      "Automating appointment scheduling would save time and resources.",
      "A CRM system could help manage client relationships better.",
      "Developing service packages could increase revenue.",
      "Creating case studies from successful projects would build credibility.",
      "A referral program could help grow your client base."
    ],
    tech: [
      "Evaluating your tech business...",
      "Implementing agile methodologies could improve development cycles.",
      "Setting up automated testing would ensure quality.",
      "Creating comprehensive documentation is crucial for scaling.",
      "A clear product roadmap would guide development efforts.",
      "User feedback loops would help improve your product."
    ],
    general: [
      "Analyzing your business...",
      "Creating a digital marketing strategy would increase visibility.",
      "Implementing customer feedback systems could improve service quality.",
      "Analyzing market competition would help identify opportunities.",
      "Optimizing operational efficiency could reduce costs.",
      "Developing employee training programs would improve performance."
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
    
    // Split the response into sentences and return as array
    const sentences = data.generatedText
      .split(/(?<=[.!?])\s+/)
      .filter((sentence: string) => sentence.trim().length > 0);
    
    return sentences;
  } catch (error) {
    console.log('Falling back to local analysis due to:', error);
    // Fallback to local analysis if API fails
    return analyzeBusinessDescription(prompt);
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


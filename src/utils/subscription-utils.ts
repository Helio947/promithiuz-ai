
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/profile";

/**
 * Check if a user has an active subscription
 * @param userId The user's ID
 * @returns Boolean indicating if subscription is active
 */
export const checkActiveSubscription = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_end_date')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    // Check if subscription is active and not expired
    const isActive = data.subscription_status === 'active';
    const notExpired = data.subscription_end_date ? new Date(data.subscription_end_date) > new Date() : false;
    
    return isActive && notExpired;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
};

/**
 * Get the user's current subscription tier
 * @param userId The user's ID
 * @returns The subscription tier or 'free' if none found
 */
export const getUserSubscriptionTier = async (userId: string): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data.subscription_tier || 'free';
  } catch (error) {
    console.error('Error getting subscription tier:', error);
    return 'free';
  }
};

/**
 * Check if a feature is available for the user's subscription tier
 * @param userId The user's ID
 * @param feature The feature to check
 * @returns Boolean indicating if the feature is available
 */
export const isFeatureAvailable = async (
  userId: string, 
  feature: 'unlimited_queries' | 'unlimited_generations' | 'unlimited_workflows' | 'advanced_analytics'
): Promise<boolean> => {
  try {
    const tier = await getUserSubscriptionTier(userId);
    
    // Define features available for each tier
    const tierFeatures: Record<string, string[]> = {
      'free': [],
      'basic': ['unlimited_queries'],
      'business': ['unlimited_queries', 'unlimited_generations', 'unlimited_workflows', 'advanced_analytics']
    };
    
    // Check if the feature is available for the user's tier
    return tierFeatures[tier]?.includes(feature) || false;
  } catch (error) {
    console.error('Error checking feature availability:', error);
    return false;
  }
};

/**
 * Get subscription limits based on the user's tier
 * @param userId The user's ID
 * @returns Object containing the limits for different features
 */
export const getSubscriptionLimits = async (userId: string): Promise<{
  maxQueries: number;
  maxGenerations: number;
  maxWorkflows: number;
}> => {
  try {
    const tier = await getUserSubscriptionTier(userId);
    
    // Define limits for each tier
    const limits: Record<string, { maxQueries: number; maxGenerations: number; maxWorkflows: number }> = {
      'free': { maxQueries: 10, maxGenerations: 5, maxWorkflows: 1 },
      'basic': { maxQueries: 30, maxGenerations: 10, maxWorkflows: 5 },
      'business': { maxQueries: 100, maxGenerations: 30, maxWorkflows: 999 } // Unlimited represented as high number
    };
    
    return limits[tier] || limits.free;
  } catch (error) {
    console.error('Error getting subscription limits:', error);
    return { maxQueries: 10, maxGenerations: 5, maxWorkflows: 1 }; // Default to free tier limits
  }
};

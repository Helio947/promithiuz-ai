
import { supabase } from "@/integrations/supabase/client";

/**
 * Increments a numeric field in the user's profile
 * @param userId The user's ID
 * @param field The field to increment (must be a numeric field)
 * @param amount The amount to increment by (default: 1)
 */
export const incrementProfileMetric = async (
  userId: string, 
  field: 'ai_queries_used' | 'ai_generations_used' | 'workflows_created',
  amount: number = 1
): Promise<void> => {
  try {
    // Get current value first
    const { data, error } = await supabase
      .from('profiles')
      .select(field)
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    // Calculate new value
    const currentValue = data[field] || 0;
    const newValue = currentValue + amount;
    
    // Update with new value
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ [field]: newValue })
      .eq('id', userId);
    
    if (updateError) throw updateError;
  } catch (error) {
    console.error(`Error incrementing ${field}:`, error);
  }
};

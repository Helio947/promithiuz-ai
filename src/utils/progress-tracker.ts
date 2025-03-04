
import { supabase } from "@/integrations/supabase/client";
import analytics from "@/utils/analytics";

export interface ModuleProgress {
  id: string;
  title: string;
  completed: boolean;
  completedAt: string | null;
}

export const saveModuleProgress = async (
  userId: string | undefined,
  moduleId: string,
  moduleTitle: string,
  pathId: string = "forged-sword"
): Promise<boolean> => {
  if (!userId) {
    console.log("No user ID provided, saving progress locally");
    // Save progress locally if no user ID (not logged in)
    const localProgress = getLocalProgress();
    localProgress[moduleId] = {
      id: moduleId,
      title: moduleTitle,
      completed: true,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem("moduleProgress", JSON.stringify(localProgress));
    
    // Track the event
    analytics.trackEvent("module_completed", { moduleId, moduleTitle, local: true });
    return true;
  }

  try {
    // Check if a record already exists
    const { data: existingProgress, error: queryError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("module_title", moduleTitle)
      .eq("path_id", pathId)
      .maybeSingle();

    if (queryError) {
      console.error("Error checking existing progress:", queryError);
      return false;
    }

    if (existingProgress) {
      // Update existing record
      const { error: updateError } = await supabase
        .from("user_progress")
        .update({
          completed: true,
          completed_at: new Date().toISOString()
        })
        .eq("id", existingProgress.id);

      if (updateError) {
        console.error("Error updating progress:", updateError);
        return false;
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from("user_progress")
        .insert({
          user_id: userId,
          module_title: moduleTitle,
          path_id: pathId,
          completed: true,
          completed_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Error inserting progress:", insertError);
        return false;
      }
    }

    // Increment user progress metrics
    await incrementUserModuleCompletion(userId);
    
    // Track the event
    analytics.trackEvent("module_completed", { moduleId, moduleTitle });
    
    return true;
  } catch (error) {
    console.error("Error saving module progress:", error);
    return false;
  }
};

export const fetchUserProgress = async (
  userId: string | undefined,
  pathId: string = "forged-sword"
): Promise<ModuleProgress[]> => {
  if (!userId) {
    return Object.values(getLocalProgress());
  }

  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("path_id", pathId);

    if (error) {
      console.error("Error fetching user progress:", error);
      return [];
    }

    return data.map(item => ({
      id: item.module_title,
      title: item.module_title,
      completed: item.completed || false,
      completedAt: item.completed_at
    }));
  } catch (error) {
    console.error("Error in fetchUserProgress:", error);
    return [];
  }
};

export const getLocalProgress = (): Record<string, ModuleProgress> => {
  const progressJson = localStorage.getItem("moduleProgress");
  return progressJson ? JSON.parse(progressJson) : {};
};

export const mergeProgressData = async (userId: string): Promise<void> => {
  const localProgress = getLocalProgress();
  if (Object.keys(localProgress).length === 0) return;

  try {
    // For each local progress item, save to the database
    for (const moduleId of Object.keys(localProgress)) {
      const module = localProgress[moduleId];
      await saveModuleProgress(userId, moduleId, module.title);
    }
    
    // Clear local progress after successful merge
    localStorage.removeItem("moduleProgress");
  } catch (error) {
    console.error("Error merging progress data:", error);
  }
};

const incrementUserModuleCompletion = async (userId: string): Promise<void> => {
  try {
    // Get current count
    const { data, error } = await supabase
      .from("profiles")
      .select("selected_path")
      .eq("id", userId)
      .single();
    
    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }
    
    // If user doesn't have a selected path, set it to forged-sword
    if (!data.selected_path) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ selected_path: "forged-sword" })
        .eq("id", userId);
      
      if (updateError) {
        console.error("Error updating selected path:", updateError);
      }
    }
  } catch (error) {
    console.error("Error incrementing module completion:", error);
  }
};

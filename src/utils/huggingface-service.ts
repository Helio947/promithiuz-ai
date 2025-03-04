
import { supabase } from '@/integrations/supabase/client';

type HuggingFaceTask = 
  | 'text-generation'
  | 'summarization'
  | 'text-classification'
  | 'image-to-text';

interface HuggingFaceRequestParams {
  prompt: string;
  task?: HuggingFaceTask;
  model?: string;
}

export async function callHuggingFaceAPI({ 
  prompt, 
  task = 'text-generation', 
  model
}: HuggingFaceRequestParams) {
  try {
    const { data, error } = await supabase.functions.invoke('huggingface-ai', {
      body: { prompt, task, model }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    throw error;
  }
}

// Convenience functions for specific tasks
export const generateText = (prompt: string, model?: string) => 
  callHuggingFaceAPI({ prompt, task: 'text-generation', model });

export const summarizeText = (text: string, model?: string) => 
  callHuggingFaceAPI({ prompt: text, task: 'summarization', model });

export const classifyText = (text: string, model?: string) => 
  callHuggingFaceAPI({ prompt: text, task: 'text-classification', model });

export const describeImage = (imageUrl: string, model?: string) => 
  callHuggingFaceAPI({ prompt: imageUrl, task: 'image-to-text', model });

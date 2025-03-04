
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
  options?: Record<string, any>;
}

export async function callHuggingFaceAPI({ 
  prompt, 
  task = 'text-generation', 
  model,
  options = {}
}: HuggingFaceRequestParams) {
  try {
    // Add default options based on task
    let defaultOptions = {};
    if (task === 'text-generation') {
      defaultOptions = {
        max_new_tokens: 250,
        temperature: 0.7,
        top_p: 0.95,
      };
    } else if (task === 'summarization') {
      defaultOptions = {
        max_length: 100,
        min_length: 30,
      };
    }

    const mergedOptions = { ...defaultOptions, ...options };

    const { data, error } = await supabase.functions.invoke('huggingface-ai', {
      body: { 
        prompt, 
        task, 
        model,
        parameters: mergedOptions
      }
    });

    if (error) {
      console.error('Supabase edge function error:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    throw error;
  }
}

// Convenience functions for specific tasks
export const generateText = (prompt: string, model?: string, options?: Record<string, any>) => 
  callHuggingFaceAPI({ prompt, task: 'text-generation', model, options });

export const summarizeText = (text: string, model?: string, options?: Record<string, any>) => 
  callHuggingFaceAPI({ prompt: text, task: 'summarization', model: model || 'facebook/bart-large-cnn', options });

export const classifyText = (text: string, model?: string, options?: Record<string, any>) => 
  callHuggingFaceAPI({ prompt: text, task: 'text-classification', model: model || 'distilbert-base-uncased-finetuned-sst-2-english', options });

export const describeImage = (imageUrl: string, model?: string, options?: Record<string, any>) => 
  callHuggingFaceAPI({ prompt: imageUrl, task: 'image-to-text', model: model || 'Salesforce/blip-image-captioning-base', options });



import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2';

const huggingFaceToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, task, model } = await req.json();

    if (!huggingFaceToken) {
      console.error('Hugging Face token is not configured');
      return new Response(
        JSON.stringify({ error: 'Hugging Face token is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Hugging Face client
    const hf = new HfInference(huggingFaceToken);
    
    // Default task and model
    const selectedTask = task || 'text-generation';
    const selectedModel = model || 'gpt2';
    
    let result;
    
    switch (selectedTask) {
      case 'text-generation':
        result = await hf.textGeneration({
          model: selectedModel,
          inputs: prompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
          }
        });
        break;
        
      case 'summarization':
        result = await hf.summarization({
          model: selectedModel || 'facebook/bart-large-cnn',
          inputs: prompt,
          parameters: {
            max_length: 100,
            min_length: 30,
          }
        });
        break;
        
      case 'text-classification':
        result = await hf.textClassification({
          model: selectedModel || 'distilbert-base-uncased-finetuned-sst-2-english',
          inputs: prompt
        });
        break;
        
      case 'image-to-text':
        result = await hf.imageToText({
          model: selectedModel || 'Salesforce/blip-image-captioning-base',
          data: prompt // In this case, prompt should be a URL or base64 image
        });
        break;
        
      default:
        result = await hf.textGeneration({
          model: 'gpt2',
          inputs: prompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
          }
        });
    }

    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in huggingface-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

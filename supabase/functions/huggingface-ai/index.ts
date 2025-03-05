
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
    const { prompt, task, model, parameters } = await req.json();

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
    let selectedModel = model;
    let result;
    
    console.log(`Processing ${selectedTask} task with prompt: ${prompt.substring(0, 50)}...`);
    
    switch (selectedTask) {
      case 'text-generation':
        selectedModel = selectedModel || 'gpt2';
        console.log(`Using model: ${selectedModel}`);
        result = await hf.textGeneration({
          model: selectedModel,
          inputs: prompt,
          parameters: parameters || {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
          }
        });
        break;
        
      case 'summarization':
        selectedModel = selectedModel || 'facebook/bart-large-cnn';
        console.log(`Using model: ${selectedModel}`);
        result = await hf.summarization({
          model: selectedModel,
          inputs: prompt,
          parameters: parameters || {
            max_length: 100,
            min_length: 30,
          }
        });
        break;
        
      case 'text-classification':
        selectedModel = selectedModel || 'distilbert-base-uncased-finetuned-sst-2-english';
        console.log(`Using model: ${selectedModel}`);
        result = await hf.textClassification({
          model: selectedModel,
          inputs: prompt
        });
        break;
        
      case 'image-to-text':
        selectedModel = selectedModel || 'Salesforce/blip-image-captioning-base';
        console.log(`Using model: ${selectedModel}`);
        try {
          // Check if the input is a valid URL
          new URL(prompt);
          
          result = await hf.imageToText({
            model: selectedModel,
            data: prompt  // Expecting a URL to the image
          });
        } catch (urlError) {
          console.error('Invalid image URL:', urlError);
          return new Response(
            JSON.stringify({ error: 'Invalid image URL. Please provide a direct link to an image.' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        break;
        
      default:
        selectedModel = selectedModel || 'gpt2';
        console.log(`Using default model: ${selectedModel}`);
        result = await hf.textGeneration({
          model: selectedModel,
          inputs: prompt,
          parameters: parameters || {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
          }
        });
    }

    console.log('Processing complete');
    
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

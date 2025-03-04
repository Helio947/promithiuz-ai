
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  query: string;
  businessContext?: {
    industry?: string;
    size?: string;
    goal?: string;
  };
  previousMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData: RequestBody = await req.json();
    const { query, businessContext, previousMessages } = requestData;
    
    console.log('Processing business insight query:', query);
    console.log('Business context:', businessContext);

    if (!query) {
      throw new Error('Query is required');
    }

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Prepare the system message with business context if available
    let systemMessage = 'You are a business insights AI assistant. You help business professionals understand their data and provide actionable recommendations.';
    
    if (businessContext) {
      systemMessage += ` The user is in the ${businessContext.industry || 'unspecified'} industry with a ${businessContext.size || 'unspecified'} sized business. Their primary goal is ${businessContext.goal || 'business growth'}.`;
    }

    // Prepare the messages array for the OpenAI API
    const messages = [
      { role: 'system', content: systemMessage },
    ];

    // Add previous conversation messages if available
    if (previousMessages && previousMessages.length > 0) {
      messages.push(...previousMessages);
    }

    // Add the current user query
    messages.push({ role: 'user', content: query });

    // Make the request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Track usage for the user if available
    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // Use Supabase client from Deno to update user's AI query usage
      // This would need to be implemented with proper authentication
      console.log('Would update user AI query usage here with token', token);
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in business-insights function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    
    if (!openAIApiKey) {
      console.error("OpenAI API key is not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { businessData } = await req.json();

    if (!businessData) {
      return new Response(
        JSON.stringify({ error: "Business data is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Prepare the prompt for OpenAI
    const prompt = `
      Analyze the following business data and provide strategic insights focused on how AI tools could help optimize operations, reduce costs, and grow revenue:
      
      Business Data:
      ${JSON.stringify(businessData, null, 2)}
      
      Please provide:
      1. 3-5 key opportunities for automation or AI implementation
      2. Estimated time savings per week for each opportunity
      3. Estimated cost savings per month for each opportunity
      4. Recommended AI tools or approaches for each opportunity
      5. A 3-month implementation roadmap
      
      Format the response as JSON with these sections:
      {
        "opportunities": [
          {
            "title": "Opportunity title",
            "description": "Brief description",
            "timeSavingsWeekly": "X hours",
            "costSavingsMonthly": "$Y",
            "recommendedTools": ["Tool 1", "Tool 2"]
          }
        ],
        "roadmap": [
          {
            "month": 1,
            "focus": "What to focus on",
            "actions": ["Action 1", "Action 2"]
          }
        ],
        "summary": "Brief executive summary"
      }
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a business analytics AI specializing in identifying opportunities for small businesses to leverage AI tools." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return new Response(
        JSON.stringify({ error: "Error generating business insights" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse the JSON response
    try {
      const insights = JSON.parse(data.choices[0].message.content);
      return new Response(
        JSON.stringify(insights),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      return new Response(
        JSON.stringify({ 
          error: "Error parsing insights. Please try again.",
          rawResponse: data.choices[0].message.content
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error in business-insights function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

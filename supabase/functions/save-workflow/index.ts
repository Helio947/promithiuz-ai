
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { workflowData, userId } = await req.json();
    
    if (!workflowData || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create a table for workflows if you haven't already done so
    // Use SQL migration for this (not done in this function)

    // Save the workflow
    // const { data, error } = await supabaseClient
    //   .from("workflows")
    //   .insert({
    //     user_id: userId,
    //     name: workflowData.name || "Untitled Workflow",
    //     description: workflowData.description || "",
    //     nodes: workflowData.nodes,
    //     edges: workflowData.edges,
    //   });

    // Simplified example for this demo
    // Instead of actually saving, we'll just increment the workflow counter
    const { error: updateError } = await supabaseClient
      .from("profiles")
      .update({ 
        workflows_created: workflowData.isNew ? 
          supabaseClient.rpc('increment_counter', { row_id: userId, counter_name: 'workflows_created' }) : 
          undefined 
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating workflow count:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to save workflow" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Workflow saved successfully",
        workflowId: crypto.randomUUID() // This would normally come from the database
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in save-workflow function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});


import { Message } from "@/types/forge";

// Process user input and generate contextual responses
export const getResponseForQuestion = (userQuestion: string): { 
  responseText: string; 
  blocks?: Array<{ type: string; label: string }> 
} => {
  // Convert to lowercase for easier matching
  const lcQuestion = userQuestion.toLowerCase();
  
  // Connection-related questions
  if (lcQuestion.includes('connect') && lcQuestion.includes('block')) {
    return {
      responseText: "To connect blocks, drag from the output handle of one block to the input handle of another. This creates a workflow where data flows from one block to the next."
    };
  }
  
  // Color-related questions
  if (lcQuestion.includes('color') || lcQuestion.includes('colours')) {
    return {
      responseText: "Different colors represent different block types: blue for data processing, purple for AI tasks, green for outputs, and orange for integrations."
    };
  }
  
  // Test-related questions
  if (lcQuestion.includes('test') || lcQuestion.includes('testing')) {
    return {
      responseText: "You can test your workflow by clicking the 'Test Run' button in the top menu. This will simulate your workflow without actually executing external actions."
    };
  }
  
  // Example workflow questions
  if (lcQuestion.includes('example') || lcQuestion.includes('template') || lcQuestion.includes('sample')) {
    return {
      responseText: "You can use one of our templates from the library on the right. Would you like to add a basic Chat Response block to get started?",
      blocks: [{ type: 'chat-response', label: 'Chat Response' }]
    };
  }
  
  // Questions about specific blocks
  if (lcQuestion.includes('email')) {
    return {
      responseText: "The Email block lets you send automated emails based on triggers. Would you like to add it to your workflow?",
      blocks: [{ type: 'send-email', label: 'Send Email' }]
    };
  }
  
  if (lcQuestion.includes('image') || lcQuestion.includes('picture')) {
    return {
      responseText: "The Image Generation block can create images based on text prompts. Would you like to add it to your workflow?",
      blocks: [{ type: 'generate-image', label: 'Generate Image' }]
    };
  }
  
  if (lcQuestion.includes('analyze') || lcQuestion.includes('text') || lcQuestion.includes('process')) {
    return {
      responseText: "The Text Analysis block can examine text for sentiment, entities, and key information. Would you like to add it?",
      blocks: [{ type: 'analyze-text', label: 'Analyze Text' }]
    };
  }
  
  // Handle sales related questions
  if (lcQuestion.includes('sales') || lcQuestion.includes('customer') || lcQuestion.includes('lead')) {
    return {
      responseText: "I can help you build a workflow for sales automation. You might want to start with a Lead Qualification block or Email block. What specific part of your sales process are you automating?",
      blocks: [
        { type: 'analyze-data', label: 'Lead Qualification' },
        { type: 'send-email', label: 'Send Email' }
      ]
    };
  }
  
  // Simple greetings
  if (lcQuestion.includes('hello') || lcQuestion.includes('hi') || lcQuestion.includes('hey')) {
    return {
      responseText: "Hello! I'm here to help you build your workflow. What kind of automation are you trying to create today?"
    };
  }
  
  // Fall back to a general response with suggestion
  return {
    responseText: "I can help you build a workflow for that. You might want to start with a basic block like Chat Response. What specific task are you trying to automate?",
    blocks: [{ type: 'chat-response', label: 'Chat Response' }]
  };
};

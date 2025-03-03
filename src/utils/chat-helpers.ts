
import { Message } from "@/types/forge";

// Process user input and generate contextual responses
export const getResponseForQuestion = (userQuestion: string): { 
  responseText: string; 
  blocks?: Array<{ type: string; label: string }> 
} => {
  // Convert to lowercase for easier matching
  const lcQuestion = userQuestion.toLowerCase();
  
  // General "where to start" or "how to begin" questions
  if (lcQuestion.includes('start') || lcQuestion.includes('begin') || lcQuestion.includes('how do i') || lcQuestion.includes('what is this')) {
    return {
      responseText: "Welcome to The Forge! This is where you can build powerful AI workflows without coding. To get started, I recommend:\n\n1. First, add a block from the toolbox on the right (like the Chat Response block)\n2. Then connect blocks by dragging from one output handle to another input handle\n3. You can test your workflow anytime using the 'Test Run' button\n\nWhat kind of workflow are you looking to build today? I can suggest some blocks to help you get started!",
      blocks: [
        { type: 'chat-response', label: 'Chat Response' },
        { type: 'analyze-text', label: 'Analyze Text' }
      ]
    };
  }
  
  // Connection-related questions
  if (lcQuestion.includes('connect') && lcQuestion.includes('block')) {
    return {
      responseText: "Great question! To connect blocks, simply drag from the output handle (small circle) of one block to the input handle of another. This creates a workflow where data flows naturally from one step to the next. Think of it like connecting the dots to create a path for your data to follow. Would you like me to suggest some blocks that work well together?",
      blocks: [
        { type: 'analyze-text', label: 'Analyze Text' },
        { type: 'chat-response', label: 'Chat Response' }
      ]
    };
  }
  
  // Color-related questions
  if (lcQuestion.includes('color') || lcQuestion.includes('colours')) {
    return {
      responseText: "The different colors have specific meanings to help you quickly identify block types:\n\n• Blue blocks handle data processing tasks\n• Purple blocks perform AI-specific operations\n• Green blocks generate outputs and responses\n• Orange blocks connect to external services\n\nThis color coding makes it easier to understand your workflow at a glance. Is there a specific type of block you're looking for?",
    };
  }
  
  // Test-related questions
  if (lcQuestion.includes('test') || lcQuestion.includes('testing')) {
    return {
      responseText: "Testing your workflow is easy and important! Just click the 'Test Run' button in the top menu when you're ready. This runs a simulation of your entire workflow without actually executing any external actions (like sending emails). You'll see real-time results for each block, including any errors or success messages. I recommend testing frequently as you build to catch any issues early. Would you like to add some blocks to test?",
      blocks: [{ type: 'chat-response', label: 'Chat Response' }]
    };
  }
  
  // Example workflow questions
  if (lcQuestion.includes('example') || lcQuestion.includes('template') || lcQuestion.includes('sample')) {
    return {
      responseText: "I'd be happy to help you with examples! You can choose from our pre-built templates in the library panel on the right - we have options for customer support, content creation, lead qualification, and more. These templates give you a working foundation that you can customize to your needs. Would you like to start with a Chat Response block? It's often the best first step for many workflows.",
      blocks: [{ type: 'chat-response', label: 'Chat Response' }]
    };
  }
  
  // Questions about specific blocks
  if (lcQuestion.includes('email')) {
    return {
      responseText: "The Email block is perfect for automating communications! You can use it to automatically send personalized emails based on triggers or conditions in your workflow. For example, you might send a follow-up email when a lead meets certain criteria, or send a welcome message to new users. Would you like to add this block to your workflow now?",
      blocks: [{ type: 'send-email', label: 'Send Email' }]
    };
  }
  
  if (lcQuestion.includes('image') || lcQuestion.includes('picture')) {
    return {
      responseText: "The Image Generation block is one of our most exciting features! It uses advanced AI to create custom images based on your text descriptions. This is fantastic for creating product visualizations, social media content, or custom illustrations on demand. Would you like to add this creative block to your workflow?",
      blocks: [{ type: 'generate-image', label: 'Generate Image' }]
    };
  }
  
  if (lcQuestion.includes('analyze') || lcQuestion.includes('text') || lcQuestion.includes('process')) {
    return {
      responseText: "The Text Analysis block is incredibly powerful! It can examine any text input to identify sentiment (positive/negative tone), extract entities (people, places, organizations), find key phrases, and summarize content. This is invaluable for understanding customer feedback, processing support tickets, or analyzing conversations. Would you like to add this analytical powerhouse to your workflow?",
      blocks: [{ type: 'analyze-text', label: 'Analyze Text' }]
    };
  }
  
  // Handle sales related questions
  if (lcQuestion.includes('sales') || lcQuestion.includes('customer') || lcQuestion.includes('lead')) {
    return {
      responseText: "Building a sales automation workflow is a great choice! I'd recommend starting with the Lead Qualification block to automatically score and segment your prospects, then connect it to an Email block to send personalized follow-ups. This can save your sales team hours of manual work and ensure no lead falls through the cracks. Would you like me to help you set up this workflow?",
      blocks: [
        { type: 'analyze-data', label: 'Lead Qualification' },
        { type: 'send-email', label: 'Send Email' }
      ]
    };
  }
  
  // Simple greetings with a more helpful response
  if (lcQuestion.includes('hello') || lcQuestion.includes('hi') || lcQuestion.includes('hey')) {
    return {
      responseText: "Hello there! I'm your AI assistant in The Forge, here to help you build powerful automated workflows. You can create anything from customer support systems to content creation pipelines without writing code. What kind of process are you looking to automate today? I can suggest some building blocks to get you started!"
    };
  }
  
  // Purpose and explanation
  if (lcQuestion.includes('what does this do') || lcQuestion.includes('purpose') || lcQuestion.includes('what is this for')) {
    return {
      responseText: "The Forge is a powerful visual workflow builder that lets you create AI-powered automations without coding. You can connect different blocks (like text analysis, email sending, image generation) to build processes that run automatically. It's perfect for automating repetitive tasks, enhancing customer interactions, or creating content at scale. The best part is you can build complex workflows just by connecting blocks - no programming required! What would you like to automate first?"
    };
  }
  
  // Explanation of why it's important
  if (lcQuestion.includes('why') || lcQuestion.includes('important')) {
    return {
      responseText: "Automation through AI workflows is transformative for businesses! It saves countless hours on repetitive tasks, ensures consistent quality, scales your operations without adding staff, and operates 24/7. The Forge makes this accessible to everyone - not just developers. By building workflows here, you're essentially creating custom AI solutions that would normally require expensive development. What specific processes are taking up too much of your team's time? Let's automate them!"
    };
  }
  
  // Fall back to a general response with suggestion
  return {
    responseText: "I'd be happy to help you build an effective workflow for that! The beauty of The Forge is how it makes complex automation simple through our visual interface. I'd recommend starting with a Chat Response block as your foundation - it's versatile and works well with most workflows. From there, we can add more specialized blocks based on your specific needs. What's the main goal you're trying to achieve with this automation?",
    blocks: [{ type: 'chat-response', label: 'Chat Response' }]
  };
};


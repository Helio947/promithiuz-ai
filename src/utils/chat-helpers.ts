
import { Message } from "@/types/forge";

// Process user input and generate contextual responses
export const getResponseForQuestion = (userQuestion: string): { 
  responseText: string; 
} => {
  // Convert to lowercase for easier matching
  const lcQuestion = userQuestion.toLowerCase();
  
  // Handle block removal question
  if (lcQuestion.includes('remove') && lcQuestion.includes('block')) {
    return {
      responseText: "You can remove a block in a couple of ways! The easiest is to select the block you want to remove and press the Delete key on your keyboard. You can also right-click on a block and select 'Delete' from the context menu. Don't worry about making mistakes - you can always add blocks back if you need them again! Is there a specific type of block you're trying to remove?",
    };
  }
  
  // General "where to start" or "how to begin" questions
  if (lcQuestion.includes('start') || lcQuestion.includes('begin') || lcQuestion.includes('how do i') || lcQuestion.includes('what is this')) {
    return {
      responseText: "Hey there! Welcome to The Forge! This is your workshop for building AI workflows without writing a single line of code. Think of it as building with digital LEGO blocks, but for AI!\n\nHere's how to get started:\n\n1. Grab a block from the toolbox on the right - the Chat Response block is a great first pick!\n2. Connect blocks by dragging from the little dot on one block to another\n3. Hit 'Test Run' anytime to see your creation in action\n\nWhat kind of workflow are you dreaming up today? Maybe automating customer support? Creating content? I'm here to help make it happen!",
    };
  }
  
  // Connection-related questions
  if (lcQuestion.includes('connect') && lcQuestion.includes('block')) {
    return {
      responseText: "Connecting blocks is super intuitive! Just think of it like connecting dots in a coloring book. Click and drag from the little circle (we call that the output handle) on one block to the input handle on another block. As you drag, you'll see a line forming - that's your connection taking shape! This creates a path for your data to flow from one step to the next. It's actually pretty satisfying once you get the hang of it! Which blocks are you trying to connect?",
    };
  }
  
  // Color-related questions
  if (lcQuestion.includes('color') || lcQuestion.includes('colours')) {
    return {
      responseText: "I love that you noticed the colors! They're not just pretty - they actually mean something:\n\n• Blue blocks are your data processing workhorses\n• Purple blocks are where the AI magic happens\n• Green blocks create outputs that people see\n• Orange blocks connect to outside tools and services\n\nThe colors make it easier to spot at a glance what each part of your workflow is doing. It's like having a color-coded map of your creation! Does that help? Which color blocks are you most interested in using?",
    };
  }
  
  // Test-related questions
  if (lcQuestion.includes('test') || lcQuestion.includes('testing')) {
    return {
      responseText: "Testing your workflow is super easy and honestly kind of fun! Just hit the 'Test Run' button up top when you're ready. It runs a simulation of your entire workflow without actually sending anything out into the world (so don't worry, no test emails will accidentally land in anyone's inbox!). You'll see real-time results for each step, including any hiccups that might come up. I always recommend testing as you build - it's way easier to fix small issues as you go rather than trying to debug a complex workflow later. Want to add some blocks and give it a try?",
    };
  }
  
  // Example workflow questions
  if (lcQuestion.includes('example') || lcQuestion.includes('template') || lcQuestion.includes('sample')) {
    return {
      responseText: "Oh, you don't have to start from scratch! We've got pre-built templates ready to go in the library panel on the right. We have templates for all sorts of things - helping customers, creating content, qualifying leads, you name it! These templates give you a working starting point that you can play with and make your own. It's like getting a head start! The Chat Response block is usually a great first piece for most workflows - want me to add one for you to experiment with?",
    };
  }
  
  // Questions about specific blocks
  if (lcQuestion.includes('email')) {
    return {
      responseText: "The Email block is one of my personal favorites! It lets you automatically send personalized emails based on what happens earlier in your workflow. Imagine sending welcome emails to new sign-ups, follow-ups to potential customers, or confirmation messages - all without lifting a finger! You can customize the subject, content, and even add dynamic content based on data from other blocks. Would you like to add this block to your workflow and see what it can do?",
    };
  }
  
  if (lcQuestion.includes('image') || lcQuestion.includes('picture')) {
    return {
      responseText: "The Image Generation block is honestly mind-blowing! It creates custom images based on your text descriptions using AI. Want product mockups, social media visuals, or custom illustrations? Just describe what you want, and the AI brings it to life! It's like having a graphic designer on standby 24/7. This is super handy for creating consistent visual content without the design skills. Would you like to add this creative powerhouse to your workflow and see what it can dream up?",
    };
  }
  
  if (lcQuestion.includes('analyze') || lcQuestion.includes('text') || lcQuestion.includes('process')) {
    return {
      responseText: "The Text Analysis block is like giving your workflow a brain that understands language! It can read any text and figure out if it's positive or negative (sentiment), identify people, places, and organizations mentioned (entities), pick out the key points, and even summarize everything. It's perfect for understanding what customers are saying in feedback, prioritizing support tickets, or digging through conversations for insights. Want to add this smart little block to your workflow? I think you'll be amazed at what it can do!",
    };
  }
  
  // Handle sales related questions
  if (lcQuestion.includes('sales') || lcQuestion.includes('customer') || lcQuestion.includes('lead')) {
    return {
      responseText: "Setting up a sales workflow is such a smart move! Here's what I'd suggest: start with the Lead Qualification block to automatically score and sort your prospects (goodbye manual lead scoring!), then connect that to an Email block that sends personalized follow-ups. Your sales team will love you for this - it saves them hours of work and makes sure every promising lead gets attention at just the right time. Want me to help you set this up? I can add these blocks to get you started!",
    };
  }
  
  // Simple greetings with a more helpful response
  if (lcQuestion.includes('hello') || lcQuestion.includes('hi') || lcQuestion.includes('hey')) {
    return {
      responseText: "Hey there! Great to meet you! I'm your AI sidekick here in The Forge, ready to help you build awesome automated workflows without writing a single line of code. Whether you want to streamline customer support, create content at scale, or qualify leads automatically - we can build it together! What kind of process are you looking to automate today? I've got plenty of building blocks we can use to make your idea come to life!",
    };
  }
  
  // Purpose and explanation
  if (lcQuestion.includes('what does this do') || lcQuestion.includes('purpose') || lcQuestion.includes('what is this for')) {
    return {
      responseText: "The Forge is your no-code workshop for creating AI-powered workflows! Think of it as a visual way to build automations by connecting different blocks together - like text analysis, email sending, image creation, and more. It's perfect for automating those repetitive tasks that eat up your time, making your customer interactions more personal, or scaling up your content creation. The best part? You build everything by simply connecting blocks together - no programming required! What processes are you currently handling manually that you'd love to automate?",
    };
  }
  
  // Explanation of why it's important
  if (lcQuestion.includes('why') || lcQuestion.includes('important')) {
    return {
      responseText: "Great question! AI workflows are game-changers for businesses today. They free up your team from repetitive tasks (imagine getting hours of your day back!), ensure consistent quality (no more human errors or variations), scale your operations without hiring more people, and work around the clock without breaks. The Forge makes all this possible without needing a technical background - it's like getting the benefits of custom AI solutions without the hefty developer costs. What specific processes are currently taking up too much of your team's valuable time? Those are usually perfect candidates for automation!",
    };
  }
  
  // Fall back to a general response with suggestion
  return {
    responseText: "I'd love to help you build a workflow for that! The beauty of The Forge is how it makes complex automation feel like child's play through our visual canvas. I think starting with a Chat Response block would give you a solid foundation - it's super versatile and plays nicely with most other blocks. From there, we can add more specialized blocks based on exactly what you're trying to accomplish. What's the main goal you're hoping to achieve with this automation? The more specific you can be, the better I can guide you!",
  };
};

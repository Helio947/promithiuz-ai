export const textToTextContent = {
  overview: {
    title: "Text to Text AI Mastery",
    description: "Comprehensive strategies and best practices for leveraging AI text generation in your small business.",
  },
  modules: [
    {
      id: "foundations",
      title: "AI Foundations",
      description: "Master the fundamentals of text-based AI tools and techniques",
      requiredForUnlock: null,
      content: {
        aiTools: [
          {
            title: "Language Models & Assistants",
            tools: [
              {
                name: "GPT-4",
                use: "Advanced language understanding and generation",
                applications: ["Complex writing", "Code generation", "Creative content"]
              },
              {
                name: "Claude 2",
                use: "Detailed analysis and long-form content",
                applications: ["Research synthesis", "Document analysis", "Technical writing"]
              },
              {
                name: "Cohere",
                use: "Specialized enterprise text generation",
                applications: ["Customer service", "Product descriptions", "Multi-language support"]
              },
              {
                name: "PaLM API",
                use: "Efficient text processing and generation",
                applications: ["Chat applications", "Content summarization", "Language translation"]
              },
              {
                name: "LLaMA 2",
                use: "Open-source language model for various applications",
                applications: ["Local deployment", "Custom fine-tuning", "Research projects"]
              },
              {
                name: "Mistral AI",
                use: "Efficient and precise language processing",
                applications: ["Enterprise solutions", "Multilingual tasks", "Document processing"]
              },
              {
                name: "Falcon",
                use: "Open-source model with strong performance",
                applications: ["Academic research", "Text analysis", "Content generation"]
              },
              {
                name: "Yi",
                use: "Advanced multilingual capabilities",
                applications: ["Translation tasks", "Cross-cultural content", "Language learning"]
              }
            ]
          }
        ]
      }
    },
    {
      id: "content-creation",
      title: "Content Creation",
      description: "Learn to generate high-quality content with AI assistance",
      requiredForUnlock: "foundations",
      content: {
        strategies: [
          {
            title: "Content Creation & Marketing",
            items: [
              "Blog Post Generation - Structure posts with clear outlines and section-specific prompts",
              "Social Media Content - Create platform-specific content with brand voice consistency",
              "Email Marketing - Generate engaging subject lines and personalized email content",
              "Product Descriptions - Craft compelling product narratives with key features and benefits",
              "SEO Optimization - Generate meta descriptions and keyword-rich content"
            ],
            examples: [
              {
                title: "Blog Post Outline Generator",
                description: "Generate a structured outline for your blog post topic",
                defaultPrompt: "Create a blog post outline about 'The Benefits of AI for Small Businesses'",
                exampleOutput: "1. Introduction\n- Definition of AI for small businesses\n- Current market adoption rates\n\n2. Key Benefits\n- Cost reduction opportunities\n- Time-saving automation\n- Improved customer service\n\n3. Implementation Strategies\n- Starting small with basic AI tools\n- Measuring ROI and success\n\n4. Conclusion\n- Action steps for getting started"
              },
              {
                title: "Social Media Calendar",
                description: "Generate a week's worth of social media content",
                defaultPrompt: "Create 5 social media posts about AI productivity tools",
                exampleOutput: "Monday: 🚀 Boost your productivity with AI! Our top 3 favorite tools:\n1. @Tool1 for emails\n2. @Tool2 for scheduling\n3. @Tool3 for content\n\nTuesday: Did you know? AI can save you up to 3 hours per day on routine tasks! Here's how...\n\nWednesday: [Case Study] How @Company increased output by 40% using AI tools\n\nThursday: Quick Tip: Use AI for content brainstorming in just 5 minutes\n\nFriday: Weekend Challenge: Try one new AI tool and share your results!"
              }
            ]
          }
        ]
      }
    },
    {
      id: "customer-communication",
      title: "Customer Communication",
      description: "Enhance customer interactions with AI-powered communication",
      requiredForUnlock: "content-creation",
      content: {
        strategies: [
          {
            title: "Customer Communication",
            items: [
              "Response Templates - Create adaptive templates for common customer inquiries",
              "FAQ Generation - Develop comprehensive FAQ sections with natural language",
              "Support Scripts - Generate consistent support responses with empathy",
              "Follow-up Messages - Create personalized follow-up sequences",
              "Feedback Analysis - Process and summarize customer feedback effectively"
            ],
            examples: [
              {
                title: "Customer Response Generator",
                description: "Create empathetic customer service responses",
                defaultPrompt: "Generate a response to: 'My order hasn't arrived yet and it's been a week'",
                exampleOutput: "Dear [Customer Name],\n\nI understand your concern about the delayed delivery of your order. I know how frustrating it can be to wait longer than expected.\n\nI've checked your order status and [specific details]. Here's what we can do to help:\n\n1. Track your package\n2. Expedite shipping if needed\n3. Provide compensation for the delay\n\nPlease let me know if you'd prefer any of these options. We value your business and want to make this right.\n\nBest regards,\n[Name]"
              }
            ]
          }
        ]
      }
    }
  ],
  bestPractices: [
    {
      title: "Prompt Engineering Excellence",
      practices: [
        "Use specific, action-oriented language in prompts",
        "Include context about your business and target audience",
        "Break complex tasks into smaller, focused prompts",
        "Specify tone, length, and format requirements",
        "Review and iterate on prompt templates for best results"
      ]
    },
    {
      title: "Content Refinement Process",
      practices: [
        "Always review and edit AI-generated content",
        "Maintain consistent brand voice across outputs",
        "Verify facts and data in generated content",
        "Customize outputs for your specific audience",
        "Keep a library of successful prompts"
      ]
    }
  ],
  systemsApproach: [
    {
      title: "Implementation Framework",
      steps: [
        "Audit current content needs and gaps",
        "Create template library for common tasks",
        "Establish quality control checkpoints",
        "Train team members on prompt engineering",
        "Monitor and optimize results"
      ]
    }
  ]
};

export const otherCategories = [
  {
    title: "Text to Image",
    description: "Learn to create stunning visuals from text descriptions using advanced AI models.",
    examples: ["Product Visualization", "Marketing Assets", "Concept Art", "Brand Design"],
  },
  {
    title: "Text to Video",
    description: "Transform your ideas into engaging video content with AI-powered tools.",
    examples: ["Promotional Videos", "Educational Content", "Social Media", "Presentations"],
  }
];

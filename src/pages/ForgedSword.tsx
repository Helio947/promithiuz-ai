
import Header from "@/components/Header";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const textToTextContent = {
  overview: {
    title: "Text to Text AI Mastery",
    description: "Comprehensive strategies and best practices for leveraging AI text generation in your small business.",
  },
  strategies: [
    {
      title: "Content Creation & Marketing",
      items: [
        "Blog Post Generation - Structure posts with clear outlines and section-specific prompts",
        "Social Media Content - Create platform-specific content with brand voice consistency",
        "Email Marketing - Generate engaging subject lines and personalized email content",
        "Product Descriptions - Craft compelling product narratives with key features and benefits",
        "SEO Optimization - Generate meta descriptions and keyword-rich content"
      ]
    },
    {
      title: "Customer Communication",
      items: [
        "Response Templates - Create adaptive templates for common customer inquiries",
        "FAQ Generation - Develop comprehensive FAQ sections with natural language",
        "Support Scripts - Generate consistent support responses with empathy",
        "Follow-up Messages - Create personalized follow-up sequences",
        "Feedback Analysis - Process and summarize customer feedback effectively"
      ]
    },
    {
      title: "Business Documentation",
      items: [
        "Standard Operating Procedures - Create detailed process documentation",
        "Training Materials - Generate role-specific training content",
        "Policy Documents - Draft clear and comprehensive policies",
        "Project Proposals - Structure professional project proposals",
        "Meeting Summaries - Generate concise meeting notes and action items"
      ]
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

const otherCategories = [
  {
    title: "Text to Image",
    description: "Learn to create stunning visuals from text descriptions using advanced AI models.",
    examples: ["Product Visualization", "Marketing Assets", "Concept Art", "Brand Design"]
  },
  {
    title: "Text to Video",
    description: "Transform your ideas into engaging video content with AI-powered tools.",
    examples: ["Promotional Videos", "Educational Content", "Social Media", "Presentations"]
  }
];

const ForgedSword = () => {
  const handleUnlock = () => {
    toast.info("Coming soon! Premium features will be available shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Forge Your AI Mastery
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unlock premium expertise and master the art of AI-powered content creation across text, image, and video.
            </p>
            <Button 
              onClick={handleUnlock}
              size="lg" 
              className="mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock Premium Access
            </Button>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">{textToTextContent.overview.title}</h2>
              <p className="text-gray-600 mb-8">{textToTextContent.overview.description}</p>
              
              <Accordion type="single" collapsible className="space-y-4">
                {textToTextContent.strategies.map((strategy, index) => (
                  <AccordionItem key={index} value={`strategy-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {strategy.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {strategy.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {textToTextContent.bestPractices.map((practice, index) => (
                  <AccordionItem key={`practice-${index}`} value={`practice-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {practice.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {practice.practices.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {textToTextContent.systemsApproach.map((system, index) => (
                  <AccordionItem key={`system-${index}`} value={`system-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {system.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        {system.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.examples.map((example, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgedSword;


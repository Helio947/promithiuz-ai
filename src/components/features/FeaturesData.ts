import { Eye, Sparkles, MessageSquare, Sword, BarChart3, Users, Clock, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  isPremium?: boolean;
  businessImpact?: string;
}

export const features: Feature[] = [
  {
    icon: Eye,
    title: "Promithiuz AI Vision",
    description: "Get data-driven insights and forecasts to make better business decisions with 89% accuracy.",
    route: "/prometheus-vision",
    businessImpact: "Increase revenue by 17-32%"
  },
  {
    icon: Sparkles,
    title: "The Forge",
    description: "Create custom AI workflows that automate repetitive tasks - saves 8-12 hours per employee weekly.",
    route: "/forge",
    businessImpact: "Cut operational costs by 27%"
  },
  {
    icon: MessageSquare,
    title: "Prompt Codex",
    description: "Generate perfect AI prompts in seconds with our simple Goal, Format, Warnings, and Context framework.",
    route: "/prompt-codex",
    businessImpact: "80% faster content creation"
  },
  {
    icon: Sword,
    title: "Forged Sword",
    description: "Premium AI implementation strategies with personalized guidance from AI business experts.",
    route: "/forged-sword",
    isPremium: true,
    businessImpact: "ROI of 300-500% within 6 months"
  },
  {
    icon: Sparkles,
    title: "Hugging Face AI Playground",
    description: "Experiment with state-of-the-art open-source AI models for text generation, summarization, and image analysis.",
    route: "/huggingface-ai",
    businessImpact: "Rapid AI prototyping and testing"
  }
];

export const caseStudies = [
  {
    company: "UrbanStyle Boutique",
    industry: "Retail",
    challenge: "Struggling to manage inventory and customer service with limited staff",
    solution: "Implemented AI-powered inventory forecasting and customer service automation",
    results: "Reduced inventory costs by 23% and increased customer satisfaction by 47%",
    icon: Users
  },
  {
    company: "QuickServe Plumbing",
    industry: "Service Business",
    challenge: "Inefficient scheduling and customer follow-ups causing lost opportunities",
    solution: "Deployed AI scheduling assistant and automated follow-up system",
    results: "Increased bookings by 31% and reduced administrative time by 65%",
    icon: Clock
  },
  {
    company: "Dharma Accounting",
    industry: "Professional Services",
    challenge: "Manual data entry and standard reporting taking excessive time",
    solution: "Implemented AI data extraction and report generation",
    results: "Processed 3x more clients with the same staff and improved accuracy by 96%",
    icon: BarChart3
  },
  {
    company: "GreenLeaf Restaurant",
    industry: "Food & Beverage",
    challenge: "Ineffective marketing and inconsistent customer engagement",
    solution: "Deployed AI-generated marketing campaigns and review response system",
    results: "Increased social media engagement by 215% and boosted revenue by 28%",
    icon: DollarSign
  }
];

export const implementationSteps = [
  {
    title: "Assessment & Planning",
    description: "We analyze your business workflows to identify where AI can have the greatest impact",
    timeframe: "Week 1-2"
  },
  {
    title: "Tool Configuration",
    description: "Custom setup of AI tools tailored to your specific business processes and needs",
    timeframe: "Week 2-3"
  },
  {
    title: "Team Training",
    description: "Comprehensive training for your team to effectively utilize the AI tools",
    timeframe: "Week 4"
  },
  {
    title: "Integration & Testing",
    description: "Seamless integration with your existing systems and thorough testing",
    timeframe: "Week 5-6"
  },
  {
    title: "Optimization & Scaling",
    description: "Continuous refinement of your AI systems and expansion to other business areas",
    timeframe: "Ongoing"
  }
];

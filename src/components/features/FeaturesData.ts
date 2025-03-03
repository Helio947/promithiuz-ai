
import { Brain, Sparkles, MessageSquare, Sword } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  isPremium?: boolean;
}

export const features: Feature[] = [
  {
    icon: Brain,
    title: "Promithiuz AI Vision",
    description: "Get personalized AI-driven insights and recommendations for your business growth.",
    route: "/prometheus-vision"
  },
  {
    icon: Sparkles,
    title: "The Forge",
    description: "Create custom AI workflows with our intuitive drag-and-drop interface.",
    route: "/forge"
  },
  {
    icon: MessageSquare,
    title: "Prompt Engine",
    description: "Explore our curated repository of business-ready prompts to enhance your AI interactions.",
    route: "/prompt-engine"
  },
  {
    icon: Sword,
    title: "Forged Sword",
    description: "Premium expertise in text, image, and video AI tools to supercharge your business.",
    route: "/forged-sword",
    isPremium: true
  }
];

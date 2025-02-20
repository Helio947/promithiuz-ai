
export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  saves: number;
  likes: number;
  isFavorited?: boolean;
}

export const categories = [
  "Marketing",
  "Sales",
  "Customer Service", 
  "Content Creation",
  "Product Development",
  "HR",
  "Data Analysis",
  "AI Training",
  "Image Generation",
  "Translation",
  "General Business",
  "Social Media"
] as const;

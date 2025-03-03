
export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  structure?: {
    goal?: string;
    returnFormat?: string;
    warnings?: string;
    contextDump?: string;
  };
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

export const promptStructureSections = [
  "goal",
  "returnFormat",
  "warnings",
  "contextDump"
] as const;

export type PromptSection = typeof promptStructureSections[number];

export const sectionLabels: Record<PromptSection, string> = {
  goal: "Goal",
  returnFormat: "Format",
  warnings: "Warnings",
  contextDump: "Context"
};

export const sectionColors: Record<PromptSection, string> = {
  goal: "bg-green-500",
  returnFormat: "bg-blue-500",
  warnings: "bg-orange-500",
  contextDump: "bg-purple-500"
};

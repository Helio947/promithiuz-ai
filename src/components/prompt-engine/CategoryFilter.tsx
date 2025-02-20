
import { Button } from "@/components/ui/button";
import { categories } from "@/types/prompt-engine";
import { Code2, EditIcon, MessageSquare, Zap } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  "Code Generation": <Code2 className="w-4 h-4" />,
  "Content Creation": <EditIcon className="w-4 h-4" />,
  "Chat & Dialogue": <MessageSquare className="w-4 h-4" />,
  "Automation": <Zap className="w-4 h-4" />,
};

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
          size="sm"
          className="shrink-0 text-xs font-medium"
        >
          {categoryIcons[category]}
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

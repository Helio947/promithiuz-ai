
import { Button } from "@/components/ui/button";
import { categories } from "@/types/prompt-engine";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
          size="sm"
          className="shrink-0 text-xs"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

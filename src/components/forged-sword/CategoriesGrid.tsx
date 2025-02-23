
import CategoryCard from "./CategoryCard";

interface Category {
  title: string;
  description: string;
  examples: string[];
}

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          description={category.description}
          examples={category.examples}
        />
      ))}
    </div>
  );
};

export default CategoriesGrid;


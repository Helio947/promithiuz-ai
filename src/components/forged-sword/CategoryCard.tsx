
interface CategoryCardProps {
  title: string;
  description: string;
  examples: string[];
}

const CategoryCard = ({ title, description, examples }: CategoryCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {examples.map((example, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            {example}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;

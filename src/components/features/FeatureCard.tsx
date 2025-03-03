
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  isPremium?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, route, isPremium = false }: FeatureCardProps) => {
  return (
    <Link
      to={route}
      className={`p-6 rounded-2xl border ${
        isPremium 
          ? "bg-gradient-to-tr from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 border-primary/20" 
          : "bg-white hover:shadow-lg border-gray-200"
      } transition-all duration-300 hover:-translate-y-1 relative`}
    >
      <div className={`w-12 h-12 rounded-lg ${
        isPremium 
          ? "bg-gradient-to-tr from-primary to-secondary text-white"
          : "bg-primary/10 text-primary"
      } flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {title}
        {isPremium && (
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            Premium
          </span>
        )}
      </h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default FeatureCard;

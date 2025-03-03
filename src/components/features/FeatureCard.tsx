
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  route: string;
  isPremium?: boolean;
  businessImpact?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  route, 
  isPremium = false,
  businessImpact
}: FeatureCardProps) => {
  return (
    <Link
      to={route}
      className={`p-6 rounded-2xl border ${
        isPremium 
          ? "bg-gradient-to-tr from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 border-primary/20" 
          : "bg-white hover:shadow-lg border-gray-200"
      } transition-all duration-300 hover:-translate-y-1 relative group h-full flex flex-col`}
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
      <p className="text-gray-600 mb-4">{description}</p>
      
      {businessImpact && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="text-green-600 font-semibold flex items-center gap-1 text-sm">
            <span>Impact:</span> {businessImpact}
          </div>
        </div>
      )}
      
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-primary text-white text-xs rounded-full px-2 py-1">
          Explore
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;


import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return { icon: "w-5 h-5", text: "text-lg" };
      case "md":
        return { icon: "w-6 h-6", text: "text-xl" };
      case "lg":
        return { icon: "w-8 h-8", text: "text-2xl" };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-secondary/30 rounded-full blur-md animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-primary to-secondary p-2 rounded-full">
          <Brain className={cn("text-white", sizeClasses.icon)} />
        </div>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", sizeClasses.text)}>
          <span className="text-primary">Prom</span>
          <span className="text-secondary">ithiuz</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;


import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CostCalculator } from "@/components/ai-calculator/CostCalculator";

const Header = () => {
  const location = useLocation();
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Promithiuz AI
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <Link 
              to="/prometheus-vision" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                location.pathname === "/prometheus-vision" && "text-primary"
              )}
            >
              Promithiuz Vision
            </Link>
            <Link 
              to="/forged-sword" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                location.pathname === "/forged-sword" && "text-primary",
                "flex items-center gap-2"
              )}
            >
              Forged Sword
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                Premium
              </span>
            </Link>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
            <Button 
              variant="default"
              onClick={() => setCalculatorOpen(true)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              AI Calculator
            </Button>
          </nav>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[200px] bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <DropdownMenuItem asChild>
                <a href="#features" className="w-full cursor-pointer text-gray-600 hover:text-primary hover:bg-gray-50">
                  Features
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/prometheus-vision" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                  Promithiuz Vision
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/forged-sword" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50 flex items-center justify-between">
                  Forged Sword
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Premium
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#about" className="w-full cursor-pointer text-gray-600 hover:text-primary hover:bg-gray-50">
                  About
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="w-full text-primary font-medium hover:bg-primary/10 hover:text-primary"
                onSelect={() => setCalculatorOpen(true)}
              >
                AI Calculator
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <CostCalculator 
            open={calculatorOpen} 
            onOpenChange={setCalculatorOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;


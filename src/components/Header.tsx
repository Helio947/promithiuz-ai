
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

const Header = () => {
  const location = useLocation();

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
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">Who We Are</a>
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
              to="/forge" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                location.pathname === "/forge" && "text-primary"
              )}
            >
              The Forge
            </Link>
            <Link 
              to="/prompt-engine" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                location.pathname === "/prompt-engine" && "text-primary"
              )}
            >
              Prompt Engine
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
                <a href="#about" className="w-full cursor-pointer text-gray-600 hover:text-primary hover:bg-gray-50">
                  Who We Are
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/prometheus-vision" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                  Promithiuz Vision
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/forge" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                  The Forge
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/prompt-engine" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                  Prompt Engine
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "@/types/profile";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error);
          setUserName(session.user.email || "User");
          return;
        }
        
        const profile = data as Profile;
        if (profile && profile.full_name) {
          setUserName(profile.full_name);
        } else {
          setUserName(session.user.email || "User");
        }
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);
      
      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error);
          setUserName(session.user.email || "User");
          return;
        }
        
        const profile = data as Profile;
        if (profile && profile.full_name) {
          setUserName(profile.full_name);
        } else {
          setUserName(session.user.email || "User");
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
            <Link 
              to="/who-we-are" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                location.pathname === "/who-we-are" && "text-primary"
              )}
            >
              Who We Are
            </Link>
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
              to="/prompt-codex" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors",
                (location.pathname === "/prompt-codex" || location.pathname === "/prompt-engine" || location.pathname === "/prompt-genie") && "text-primary"
              )}
            >
              Prompt Codex
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

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {userName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate("/auth")}
                variant="default" 
                size="sm"
              >
                Sign In
              </Button>
            )}
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
                <Link to="/who-we-are" className="w-full cursor-pointer text-gray-600 hover:text-primary hover:bg-gray-50">
                  Who We Are
                </Link>
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
                <Link to="/prompt-codex" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                  Prompt Codex
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
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/auth" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50">
                    Sign In
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

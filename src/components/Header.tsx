
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import Logo from "./ui/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error: any) {
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-primary">Promithiuz AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/who-we-are" className="text-gray-700 hover:text-primary transition-colors">
            About Us
          </Link>
          {isAuthenticated && !loading ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors flex items-center">
                  <UserCircle className="mr-1 h-4 w-4" />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-6 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/who-we-are" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
              About Us
            </Link>
            {isAuthenticated && !loading ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors flex items-center" onClick={toggleMenu}>
                  <UserCircle className="mr-1 h-4 w-4" />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center justify-center"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={toggleMenu}>
                <Button variant="default" size="sm" className="w-full">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Check if we have a valid hash in the URL (from the email link)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes("type=recovery")) {
      // No valid hash found, redirect to auth page
      toast.error("Invalid or expired recovery link");
      navigate("/auth");
    }
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Password updated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="text-gray-600 text-sm mt-1">Create a new password for your account</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

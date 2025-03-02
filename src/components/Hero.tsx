
import { ArrowRight, Clock, DollarSign, Brain, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="mb-8 inline-block">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent font-medium">
                Real AI Impact for Small Businesses
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Save 15+ Hours Weekly & Cut Costs by 40%
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Small businesses using AI save 520-1,560 hours yearly and reduce costs by $10,000-$50,000 annually.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-primary text-white text-lg px-8 py-6 h-auto"
                onClick={() => navigate("/auth")}
              >
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Features
              </Button>
            </div>

            {/* Key Business Areas Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">80%</p>
                  <p className="text-muted-foreground">Inquiries Automated</p>
                  <p className="text-xl font-semibold text-primary">$2,000/mo saved</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">416hrs</p>
                  <p className="text-muted-foreground">Saved Yearly</p>
                  <p className="text-xl font-semibold text-primary">$1,500/mo saved</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-4">
                  <Brain className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Content Creation</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-green-500">70%</p>
                  <p className="text-muted-foreground">Faster Production</p>
                  <p className="text-xl font-semibold text-primary">$20K/yr saved</p>
                </div>
              </div>
            </div>

            {/* Customer Types */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Who We Help</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Small Business Owners
                  </h4>
                  <p className="text-gray-600">
                    Retail, restaurants, and local service businesses looking to automate routine tasks and reduce costs.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Solopreneurs & Freelancers
                  </h4>
                  <p className="text-gray-600">
                    Consultants, designers, writers, and marketers needing to maximize their limited time.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Digital Agencies
                  </h4>
                  <p className="text-gray-600">
                    Firms serving multiple clients who need to scale their capabilities without adding staff.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Professional Services
                  </h4>
                  <p className="text-gray-600">
                    Law firms, accountants, and real estate agents looking to streamline client communications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

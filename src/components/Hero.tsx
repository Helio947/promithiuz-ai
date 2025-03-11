
import { ArrowRight, Clock, DollarSign, Brain, TrendingUp, Users, MessageSquare, Check } from "lucide-react";
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
                AI That Delivers Real Results for Small Businesses
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Save 15+ Hours Weekly & Cut Costs by 40%
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn how to leverage AI to save time, reduce costs, and grow your small business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-primary text-white text-lg px-8 py-6 h-auto group"
                onClick={() => navigate("/auth")}
              >
                Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Solutions
              </Button>
            </div>

            {/* Key Business Impact Metrics - Using the new design from the uploaded image */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2">15+</h3>
                <p className="text-gray-600">Hours saved weekly</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-4xl font-bold mb-2">40%</h3>
                <p className="text-gray-600">Cost reduction</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold mb-2">30%</h3>
                <p className="text-gray-600">Revenue growth</p>
              </div>
            </div>

            {/* Value Proposition Section - REMOVED THE THREE VALUE PROP ITEMS FROM IMAGE */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Promithiuz AI?</h3>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">No Technical Expertise Required</h4>
                    <p className="text-gray-600 text-sm">Our intuitive platform is designed for business owners, not engineers</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Implementation</h4>
                    <p className="text-gray-600 text-sm">Get up and running with AI in days, not months</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Affordable Pricing</h4>
                    <p className="text-gray-600 text-sm">Plans that scale with your business needs and growth</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Discover Our Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Customer Types */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-4xl mx-auto mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Who We Help</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-white/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Small Business Owners
                  </h4>
                  <p className="text-gray-600">
                    Retail, restaurants, and local service businesses looking to automate routine tasks and reduce costs.
                  </p>
                  <p className="text-sm font-medium text-green-600">Average ROI: 250% in first year</p>
                </div>
                
                <div className="space-y-3 bg-white/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Solopreneurs & Freelancers
                  </h4>
                  <p className="text-gray-600">
                    Consultants, designers, writers, and marketers needing to maximize their limited time.
                  </p>
                  <p className="text-sm font-medium text-green-600">Average time saved: 20+ hours weekly</p>
                </div>
                
                <div className="space-y-3 bg-white/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Digital Agencies
                  </h4>
                  <p className="text-gray-600">
                    Firms serving multiple clients who need to scale their capabilities without adding staff.
                  </p>
                  <p className="text-sm font-medium text-green-600">Average capacity increase: 40-60%</p>
                </div>
                
                <div className="space-y-3 bg-white/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Professional Services
                  </h4>
                  <p className="text-gray-600">
                    Law firms, accountants, and real estate agents looking to streamline client communications.
                  </p>
                  <p className="text-sm font-medium text-green-600">Average client satisfaction increase: 35%</p>
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

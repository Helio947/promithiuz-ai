
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
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
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12">
            <div className="mb-8 inline-block">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                Join 10,000+ Growing Businesses
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Boost Your Sales By 3x With AI-Powered Market Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get personalized strategies and predictions that help you identify untapped opportunities and outperform your competition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get My AI Growth Strategy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See Live Demo
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="text-sm text-muted-foreground mb-8">
              Trusted by industry leaders
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              {/* Company logos in grayscale */}
              <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Company Logo" className="h-8 opacity-50 hover:opacity-75 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Company Logo" className="h-8 opacity-50 hover:opacity-75 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Company Logo" className="h-8 opacity-50 hover:opacity-75 transition-opacity" />
            </div>

            {/* Testimonial */}
            <div className="max-w-2xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <blockquote className="text-lg italic text-gray-600 mb-4">
                "Using this AI platform, we've increased our market share by 27% in just 3 months. The insights are incredibly accurate and actionable."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">CMO at TechGrowth</div>
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

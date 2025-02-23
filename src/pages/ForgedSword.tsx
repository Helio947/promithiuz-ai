
import Header from "@/components/Header";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categories = [
  {
    title: "Text to Text",
    description: "Master prompt engineering and text generation for content creation, analysis, and more.",
    examples: ["Content Writing", "Analysis", "Translation", "Summarization"]
  },
  {
    title: "Text to Image",
    description: "Learn to create stunning visuals from text descriptions using advanced AI models.",
    examples: ["Product Visualization", "Marketing Assets", "Concept Art", "Brand Design"]
  },
  {
    title: "Text to Video",
    description: "Transform your ideas into engaging video content with AI-powered tools.",
    examples: ["Promotional Videos", "Educational Content", "Social Media", "Presentations"]
  }
];

const ForgedSword = () => {
  const handleUnlock = () => {
    toast.info("Coming soon! Premium features will be available shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Forge Your AI Mastery
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unlock premium expertise and master the art of AI-powered content creation across text, image, and video.
            </p>
            <Button 
              onClick={handleUnlock}
              size="lg" 
              className="mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock Premium Access
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.examples.map((example, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgedSword;


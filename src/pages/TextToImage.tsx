
import Header from "@/components/Header";
import Overview from "@/components/forged-sword/Overview";
import { toast } from "sonner";

const TextToImage = () => {
  const handleUnlock = () => {
    toast.info("Coming soon! Premium features will be available shortly.");
  };

  const handleMasteryClick = () => {
    toast.info("Explore our comprehensive AI image generation mastery guide below!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <Overview 
            title="AI Image Generation Mastery"
            description="Master the art of AI image generation with our comprehensive guide to tools, techniques, and best practices."
            onUnlock={handleUnlock}
            onMasteryClick={handleMasteryClick}
          />
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <p className="text-gray-600">Content coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextToImage;


import Header from "@/components/Header";
import { toast } from "sonner";
import Overview from "@/components/forged-sword/Overview";
import MainContent from "@/components/forged-sword/MainContent";
import CategoriesGrid from "@/components/forged-sword/CategoriesGrid";
import { textToTextContent, otherCategories } from "@/data/forged-sword-content";

const ForgedSword = () => {
  const handleUnlock = () => {
    toast.info("Coming soon! Premium features will be available shortly.");
  };

  const handleMasteryClick = () => {
    toast.info("Explore our comprehensive AI text generation mastery guide below!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <Overview 
            title={textToTextContent.overview.title}
            description={textToTextContent.overview.description}
            onUnlock={handleUnlock}
            onMasteryClick={handleMasteryClick}
          />

          <MainContent 
            aiTools={textToTextContent.aiTools}
            strategies={textToTextContent.strategies}
            bestPractices={textToTextContent.bestPractices}
            systemsApproach={textToTextContent.systemsApproach}
          />

          <CategoriesGrid categories={otherCategories} />
        </div>
      </main>
    </div>
  );
};

export default ForgedSword;


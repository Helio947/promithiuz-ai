
import MainContent from "@/components/forged-sword/MainContent";
import Overview from "@/components/forged-sword/Overview";
import Header from "@/components/Header";
import { textToTextContent } from "@/data/forged-sword-content";
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

const ForgedSword = () => {
  const { toast } = useToast();

  const handleUnlock = useCallback(() => {
    toast({
      title: "Premium Access",
      description: "This feature is coming soon!",
    });
  }, [toast]);

  const handleMasteryClick = useCallback(() => {
    toast({
      title: "Mastery Program",
      description: "Starting your AI mastery journey soon!",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
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
      </main>
    </div>
  );
};

export default ForgedSword;

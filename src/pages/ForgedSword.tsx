
import MainContent from "@/components/forged-sword/MainContent";
import Overview from "@/components/forged-sword/Overview";
import SystemApproach from "@/components/forged-sword/SystemApproach";
import AIToolCategory from "@/components/forged-sword/AIToolCategory";
import BestPracticeCategory from "@/components/forged-sword/BestPracticeCategory";
import StrategyCategory from "@/components/forged-sword/StrategyCategory";
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
        <SystemApproach 
          title={textToTextContent.systemsApproach[0].title}
          steps={textToTextContent.systemsApproach[0].steps}
          index={0}
        />
        <MainContent 
          aiTools={textToTextContent.aiTools}
          strategies={textToTextContent.strategies}
          bestPractices={textToTextContent.bestPractices}
          systemsApproach={textToTextContent.systemsApproach}
        />
        <div className="space-y-16 mt-16">
          {textToTextContent.aiTools.map((category, index) => (
            <AIToolCategory 
              key={index}
              title={category.title}
              tools={category.tools}
              index={index}
            />
          ))}
          {textToTextContent.bestPractices.map((practice, index) => (
            <BestPracticeCategory 
              key={index}
              title={practice.title}
              practices={practice.practices}
              index={index}
            />
          ))}
          {textToTextContent.strategies.map((strategy, index) => (
            <StrategyCategory 
              key={index}
              title={strategy.title}
              items={strategy.items}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ForgedSword;

import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/accordion";
import AIToolCategory from "./AIToolCategory";
import StrategyCategory from "./StrategyCategory";
import SystemApproach from "./SystemApproach";
import ModuleProgress from "./ModuleProgress";
import InteractiveExample from "./InteractiveExample";
import { useToast } from "@/components/ui/use-toast";
import { saveModuleProgress, fetchUserProgress } from "@/utils/progress-tracker";
import { useAuth } from "@/contexts/AuthContext";
import analytics from "@/utils/analytics";

interface MainContentProps {
  aiTools: any[];
  strategies: any[];
  bestPractices: any[];
  systemsApproach: any[];
  modules?: Array<{
    id: string;
    title: string;
    description: string;
    requiredForUnlock: string | null;
    content: {
      aiTools?: any[];
      strategies?: any[];
      examples?: Array<{
        title: string;
        description: string;
        defaultPrompt: string;
        exampleOutput: string;
      }>;
    };
  }>;
}

const MainContent = ({ modules = [], bestPractices, systemsApproach }: MainContentProps) => {
  const [activeModule, setActiveModule] = useState<string>("foundations");
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadUserProgress = async () => {
      try {
        setIsLoading(true);
        const progress = await fetchUserProgress(user?.id);
        const completedModuleIds = progress
          .filter(module => module.completed)
          .map(module => module.id);
        
        setCompletedModules(completedModuleIds);
      } catch (error) {
        console.error("Error loading user progress:", error);
        toast({
          title: "Error",
          description: "Failed to load your progress. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProgress();
  }, [user, toast]);

  const isModuleLocked = (moduleId: string) => {
    if (moduleId === "foundations") return false; // AI Foundations is always unlocked
    const module = modules.find(m => m.id === moduleId);
    if (!module?.requiredForUnlock) return false;
    return !completedModules.includes(module.requiredForUnlock);
  };

  const handleModuleClick = (moduleId: string) => {
    if (isModuleLocked(moduleId)) {
      const module = modules.find(m => m.id === moduleId);
      const requiredModule = modules.find(m => m.id === module?.requiredForUnlock);
      toast({
        title: "Module Locked",
        description: `Complete "${requiredModule?.title}" first to unlock this module.`,
      });
      return;
    }
    
    setActiveModule(moduleId);
    analytics.trackEvent("module_selected", { moduleId });
  };

  const handleCompleteModule = async () => {
    if (!completedModules.includes(activeModule)) {
      const module = modules.find(m => m.id === activeModule);
      if (!module) return;
      
      const success = await saveModuleProgress(
        user?.id, 
        activeModule, 
        module.title
      );
      
      if (success) {
        setCompletedModules(prev => [...prev, activeModule]);
        toast({
          title: "Module Completed",
          description: "Great job! You've completed this module.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save your progress. Please try again.",
        });
      }
    }
  };

  const handleTryExample = async (exampleTitle: string, prompt: string) => {
    analytics.trackEvent("example_used", { 
      moduleId: activeModule, 
      exampleTitle, 
      prompt 
    });
    
    // This would eventually connect to a real backend to process the example
    toast({
      title: "Example Processing",
      description: "This interactive example will be available in the next update!",
    });
  };

  const currentModule = modules.find(m => m.id === activeModule);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-center py-12">
          <div className="inline-block h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="grid gap-4 mb-8">
        {modules.map((module) => (
          <ModuleProgress
            key={module.id}
            title={module.title}
            description={module.description}
            isLocked={isModuleLocked(module.id)}
            isCompleted={completedModules.includes(module.id)}
            onClick={() => handleModuleClick(module.id)}
          />
        ))}
      </div>

      {currentModule && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <Accordion type="single" collapsible className="space-y-4">
            {currentModule.content.aiTools?.map((toolCategory, index) => (
              <AIToolCategory 
                key={index}
                title={toolCategory.title}
                tools={toolCategory.tools}
                index={index}
              />
            ))}

            {currentModule.content.strategies?.map((strategy, index) => (
              <StrategyCategory
                key={index}
                title={strategy.title}
                items={strategy.items}
                index={index}
                examples={strategy.examples}
              />
            ))}
          </Accordion>

          {currentModule.content.examples && (
            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold mb-6">Interactive Examples</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {currentModule.content.examples.map((example, index) => (
                  <InteractiveExample
                    key={index}
                    title={example.title}
                    description={example.description}
                    defaultPrompt={example.defaultPrompt}
                    exampleOutput={example.exampleOutput}
                    onTry={(prompt) => handleTryExample(example.title, prompt)}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleCompleteModule}
            className="mt-8 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={completedModules.includes(activeModule)}
          >
            {completedModules.includes(activeModule) ? 'Module Completed ✓' : 'Complete Module'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;

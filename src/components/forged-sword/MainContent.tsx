
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import AIToolCategory from "./AIToolCategory";
import StrategyCategory from "./StrategyCategory";
import BestPracticeCategory from "./BestPracticeCategory";
import SystemApproach from "./SystemApproach";
import ModuleProgress from "./ModuleProgress";
import InteractiveExample from "./InteractiveExample";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const isModuleLocked = (moduleId: string) => {
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
  };

  const handleCompleteModule = () => {
    if (!completedModules.includes(activeModule)) {
      setCompletedModules(prev => [...prev, activeModule]);
      toast({
        title: "Module Completed",
        description: "Great job! You've completed this module.",
      });
    }
  };

  const currentModule = modules.find(m => m.id === activeModule);

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
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleCompleteModule}
            className="mt-8 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Complete Module
          </button>
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
        <Accordion type="single" collapsible className="space-y-4">
          {bestPractices.map((practice, index) => (
            <BestPracticeCategory
              key={index}
              title={practice.title}
              practices={practice.practices}
              index={index}
            />
          ))}

          {systemsApproach.map((system, index) => (
            <SystemApproach
              key={index}
              title={system.title}
              steps={system.steps}
              index={index}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MainContent;

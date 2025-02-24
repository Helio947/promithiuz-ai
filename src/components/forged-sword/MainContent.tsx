
import { Accordion } from "@/components/ui/accordion";
import AIToolCategory from "./AIToolCategory";
import StrategyCategory from "./StrategyCategory";
import BestPracticeCategory from "./BestPracticeCategory";
import SystemApproach from "./SystemApproach";

interface MainContentProps {
  aiTools: any[];
  strategies: any[];
  bestPractices: any[];
  systemsApproach: any[];
}

const MainContent = ({ aiTools, strategies, bestPractices, systemsApproach }: MainContentProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <Accordion type="single" collapsible className="space-y-4">
          {aiTools.map((toolCategory, index) => (
            <AIToolCategory 
              key={index}
              title={toolCategory.title}
              tools={toolCategory.tools}
              index={index}
            />
          ))}

          {strategies.map((strategy, index) => (
            <StrategyCategory
              key={index}
              title={strategy.title}
              items={strategy.items}
              index={index}
              examples={strategy.examples}
            />
          ))}

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

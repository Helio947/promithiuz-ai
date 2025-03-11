
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import IntroStage from "./stages/IntroStage";
import BasicsStage from "./stages/BasicsStage";
import UseCasesStage from "./stages/UseCasesStage";
import InstructionStage from "./stages/InstructionStage";
import WorkflowStage from "./stages/WorkflowStage";
import SecurityStage from "./stages/SecurityStage";
import FutureStage from "./stages/FutureStage";
import GraduationStage from "./stages/GraduationStage";

interface GameStageProps {
  stage: {
    id: string;
    title: string;
    description: string;
    content: string;
    interactionType: string;
    completionCriteria: string;
    questions?: Array<{
      question: string;
      options: string[];
      correctIndex: number;
    }>;
    items?: Array<{
      task: string;
      agent: string;
    }>;
    exercise?: {
      task: string;
      goodExample: string;
      badExample: string;
    };
    flowElements?: Array<{
      id: string;
      type: string;
      label: string;
    }>;
    scenarios?: Array<{
      situation: string;
      options: Array<{
        text: string;
        isCorrect: boolean;
      }>;
    }>;
  };
  onComplete: () => void;
}

const GameStage = ({ stage, onComplete }: GameStageProps) => {
  const renderStageContent = () => {
    switch (stage.content) {
      case "intro":
        return <IntroStage onContinue={onComplete} />;
      case "basics":
        return <BasicsStage questions={stage.questions || []} onAnswer={() => onComplete()} />;
      case "use-cases":
        return <UseCasesStage items={stage.items || []} onComplete={onComplete} />;
      case "instruction":
        return <InstructionStage exercise={stage.exercise} onComplete={onComplete} />;
      case "workflow":
        return <WorkflowStage flowElements={stage.flowElements || []} onComplete={onComplete} />;
      case "security":
        return <SecurityStage scenarios={stage.scenarios || []} onComplete={onComplete} />;
      case "future":
        return <FutureStage onContinue={onComplete} />;
      case "graduation":
        return <GraduationStage onComplete={onComplete} />;
      default:
        return (
          <div className="p-8 text-center">
            <p>Content for this stage is coming soon!</p>
            <Button onClick={onComplete} className="mt-4">Continue</Button>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-[400px]">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
        <h2 className="text-2xl font-bold text-gray-800">{stage.title}</h2>
        <p className="text-gray-600">{stage.description}</p>
      </div>
      
      <div className="p-6">
        {renderStageContent()}
      </div>
    </div>
  );
};

export default GameStage;

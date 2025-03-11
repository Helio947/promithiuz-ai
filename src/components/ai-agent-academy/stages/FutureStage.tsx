
import { Bot, Sparkles, BrainCircuit, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FutureStageProps {
  onContinue: () => void;
}

const FutureStage = ({ onContinue }: FutureStageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold">The Future of AI Agents</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          As AI technology continues to evolve, we can expect even more powerful and versatile AI agents to become available.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-violet-50 rounded-lg border border-violet-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-100 rounded-full">
              <BrainCircuit className="h-6 w-6 text-violet-600" />
            </div>
            <h4 className="text-lg font-medium text-violet-900">Multimodal AI Agents</h4>
          </div>
          <p className="text-violet-700">
            Future AI agents will seamlessly understand and work with text, images, audio, and video all at once.
          </p>
        </div>
        
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-medium text-blue-900">Specialized Industry Agents</h4>
          </div>
          <p className="text-blue-700">
            AI agents specifically designed for healthcare, law, education, and other specialized fields with deep expertise.
          </p>
        </div>
        
        <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Bot className="h-6 w-6 text-emerald-600" />
            </div>
            <h4 className="text-lg font-medium text-emerald-900">Fully Autonomous Agents</h4>
          </div>
          <p className="text-emerald-700">
            AI agents that can run continuously in the background, handling complex tasks without human intervention.
          </p>
        </div>
        
        <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <Sparkles className="h-6 w-6 text-amber-600" />
            </div>
            <h4 className="text-lg font-medium text-amber-900">Personalized AI Teams</h4>
          </div>
          <p className="text-amber-700">
            Collections of specialized AI agents working together as a team, each with different roles but coordinating seamlessly.
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium mb-2">How to Prepare</h4>
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          <li>Stay updated on new AI agent capabilities and tools</li>
          <li>Practice writing effective instructions to get the best results</li>
          <li>Start small and gradually incorporate AI agents into your workflow</li>
          <li>Consider what tasks in your daily life or business could be automated</li>
          <li>Focus on how AI can augment your abilities rather than replace them</li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={onContinue} size="lg">
          Continue to Graduation
        </Button>
      </div>
    </div>
  );
};

export default FutureStage;

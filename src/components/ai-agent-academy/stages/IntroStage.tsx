
import { Robot, Sparkles, Activity, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroStageProps {
  onContinue: () => void;
}

const IntroStage = ({ onContinue }: IntroStageProps) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
          <Robot className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Welcome to AI Agent Academy!</h3>
        <p className="text-gray-600 max-w-2xl">
          This interactive game will teach you everything you need to know about using AI agents effectively in your daily life and business.
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Clock className="h-5 w-5" />
            <h4 className="font-semibold">15 Minutes</h4>
          </div>
          <p className="text-sm text-gray-600">Complete all stages in just 15 minutes</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Activity className="h-5 w-5" />
            <h4 className="font-semibold">Interactive</h4>
          </div>
          <p className="text-sm text-gray-600">Learn by doing with hands-on exercises</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Sparkles className="h-5 w-5" />
            <h4 className="font-semibold">Practical Skills</h4>
          </div>
          <p className="text-sm text-gray-600">Gain skills you can use immediately</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Users className="h-5 w-5" />
            <h4 className="font-semibold">For Everyone</h4>
          </div>
          <p className="text-sm text-gray-600">No technical background required</p>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button onClick={onContinue} size="lg" className="px-8">
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default IntroStage;

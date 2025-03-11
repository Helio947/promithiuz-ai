
import { Bot, Trophy, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameProgress {
  stagesCompleted: number;
  points: number;
  badges: string[];
}

interface AIAgentGameHeaderProps {
  progress: GameProgress;
  currentStage: number;
  totalStages: number;
}

const AIAgentGameHeader = ({ progress, currentStage, totalStages }: AIAgentGameHeaderProps) => {
  const percentComplete = (progress.stagesCompleted / (totalStages - 1)) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Agent Academy
            </h1>
            <p className="text-gray-600">Learn to use AI agents in your daily life through this interactive game</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            <Trophy className="h-4 w-4" />
            <span className="font-medium">{progress.points} pts</span>
          </div>
          {progress.badges.length > 0 && (
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <Award className="h-4 w-4" />
              <span className="font-medium">{progress.badges.length} badges</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Stage {currentStage + 1} of {totalStages}</span>
          <span>{Math.round(percentComplete)}% complete</span>
        </div>
        <Progress value={percentComplete} className="h-2" />
      </div>
      
      {progress.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {progress.badges.map((badge, index) => (
            <div key={index} className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full px-3 py-1 text-xs flex items-center gap-1">
              <Award className="h-3 w-3 text-primary" />
              {badge}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAgentGameHeader;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface UseCasesStageProps {
  items: Array<{
    task: string;
    agent: string;
  }>;
  onComplete: () => void;
}

const UseCasesStage = ({ items, onComplete }: UseCasesStageProps) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  const handleTaskClick = (task: string) => {
    if (Object.keys(matches).includes(task)) return;
    setSelectedTask(task);
  };
  
  const handleAgentClick = (agent: string) => {
    if (selectedTask) {
      const newMatches = { ...matches, [selectedTask]: agent };
      setMatches(newMatches);
      setSelectedTask(null);
      
      // Check if all items are matched
      if (Object.keys(newMatches).length === items.length) {
        // Check if all matches are correct
        const allCorrect = items.every(item => newMatches[item.task] === item.agent);
        if (allCorrect) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }
    }
  };
  
  const isTaskMatched = (task: string) => Object.keys(matches).includes(task);
  const isAgentUsed = (agent: string) => Object.values(matches).includes(agent);
  const isMatchCorrect = (task: string) => {
    const correctAgent = items.find(item => item.task === task)?.agent;
    return matches[task] === correctAgent;
  };
  
  const allMatched = Object.keys(matches).length === items.length;
  const allCorrect = allMatched && items.every(item => matches[item.task] === item.agent);
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Match these everyday tasks with the right AI agent:</h3>
        <p className="text-sm text-gray-600">Click a task on the left, then click the matching AI agent on the right.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Tasks</h4>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTaskClick(item.task)}
              disabled={isTaskMatched(item.task)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedTask === item.task
                  ? "border-primary bg-primary/5"
                  : isTaskMatched(item.task)
                    ? isMatchCorrect(item.task)
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.task}</span>
                {isTaskMatched(item.task) && isMatchCorrect(item.task) && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-secondary">AI Agents</h4>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleAgentClick(item.agent)}
              disabled={isAgentUsed(item.agent) || !selectedTask}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                isAgentUsed(item.agent)
                  ? "border-gray-300 bg-gray-50 opacity-70"
                  : selectedTask
                    ? "border-secondary bg-secondary/5"
                    : "border-gray-200"
              }`}
            >
              {item.agent}
            </button>
          ))}
        </div>
      </div>
      
      {allMatched && (
        <div className={`p-4 rounded-lg ${
          allCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        }`}>
          {allCorrect ? (
            <div className="text-center">
              <p className="text-green-800 font-medium">Perfect! You've correctly matched all tasks to their AI agents.</p>
              <p className="text-green-700 mt-2">These are just a few examples of how AI agents can help you in everyday life.</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-800 font-medium">Some matches aren't quite right. Try again!</p>
            </div>
          )}
        </div>
      )}
      
      {allMatched && !allCorrect && (
        <div className="text-center">
          <Button onClick={() => setMatches({})} variant="outline">
            Reset Matches
          </Button>
        </div>
      )}
    </div>
  );
};

export default UseCasesStage;

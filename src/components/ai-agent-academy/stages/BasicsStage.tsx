
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface BasicsStageProps {
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
  onAnswer: (selectedIndex: number) => void;
}

const BasicsStage = ({ questions, onAnswer }: BasicsStageProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  if (questions.length === 0) {
    return <div>No questions available</div>;
  }
  
  const currentQuestion = questions[0];
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    onAnswer(index);
  };
  
  const isCorrect = selectedOption === currentQuestion.correctIndex;
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedOption === index
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedOption === index && (
                  isCorrect ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {selectedOption !== null && (
        <div className={`p-4 rounded-lg ${
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        }`}>
          {isCorrect ? (
            <p className="text-green-800">Correct! AI agents are digital assistants that can perform tasks autonomously, helping you save time and effort.</p>
          ) : (
            <div className="text-red-800">
              <p className="mb-2">That's not quite right. Let's learn more:</p>
              <p>AI agents are digital assistants that can perform tasks autonomously based on instructions from users. They help automate routine tasks and make decisions without constant supervision.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicsStage;

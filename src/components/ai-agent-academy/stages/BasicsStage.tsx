
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BasicsStageProps {
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
  }>;
  onAnswer: (selectedIndex: number) => void;
}

const BasicsStage = ({ questions, onAnswer }: BasicsStageProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>([]);
  
  if (questions.length === 0) {
    return <div>No questions available</div>;
  }
  
  const limitedQuestions = questions.slice(0, 5);
  const currentQuestion = limitedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === limitedQuestions.length - 1;
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    
    const newCompleted = [...completedQuestions];
    newCompleted[currentQuestionIndex] = true;
    setCompletedQuestions(newCompleted);
    
    if (isLastQuestion) {
      setTimeout(() => {
        onAnswer(index);
      }, 1500);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < limitedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-gray-500">
          Question {currentQuestionIndex + 1} of {limitedQuestions.length}
        </div>
        <div className="flex gap-1">
          {limitedQuestions.map((_, index) => (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full ${
                completedQuestions[index] 
                  ? "bg-green-500" 
                  : index === currentQuestionIndex 
                    ? "bg-primary" 
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
      
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
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary"
              }`}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
      </div>
      
      {selectedOption !== null && !isLastQuestion && (
        <Button 
          onClick={handleNextQuestion} 
          className="mt-4 w-full flex items-center justify-center gap-2"
        >
          Next Question <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {selectedOption !== null && isLastQuestion && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-green-800">
            Thanks for sharing! We'll use your responses to personalize your learning experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicsStage;

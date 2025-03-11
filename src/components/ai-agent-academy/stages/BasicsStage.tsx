
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

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
  
  // Limit to 5 questions
  const limitedQuestions = questions.slice(0, 5);
  const currentQuestion = limitedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === limitedQuestions.length - 1;
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    
    // Mark the current question as completed
    const newCompleted = [...completedQuestions];
    newCompleted[currentQuestionIndex] = true;
    setCompletedQuestions(newCompleted);
    
    // If it's the last question and the answer is correct, complete the stage
    if (isLastQuestion && index === currentQuestion.correctIndex) {
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
  
  const isCorrect = selectedOption === currentQuestion.correctIndex;
  
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
            <p className="text-green-800">
              {isLastQuestion 
                ? "Excellent! You've completed all questions correctly. You now understand the basics of AI agents!"
                : "Correct! That's the right answer."}
            </p>
          ) : (
            <div className="text-red-800">
              <p className="mb-2">That's not quite right. The correct answer is: {currentQuestion.options[currentQuestion.correctIndex]}</p>
            </div>
          )}
        </div>
      )}
      
      {selectedOption !== null && !isLastQuestion && (
        <Button 
          onClick={handleNextQuestion} 
          className="mt-4 w-full flex items-center justify-center gap-2"
        >
          Next Question <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default BasicsStage;

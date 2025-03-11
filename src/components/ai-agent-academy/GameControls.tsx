
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface GameControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
  isFirstStage: boolean;
  isLastStage: boolean;
  stageCompleted: boolean;
}

const GameControls = ({
  onNext,
  onPrevious,
  onRestart,
  isFirstStage,
  isLastStage,
  stageCompleted
}: GameControlsProps) => {
  return (
    <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-gray-50">
      <div>
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStage}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      </div>
      
      <div>
        <Button
          variant="outline"
          onClick={onRestart}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
      </div>
      
      <div>
        <Button
          onClick={onNext}
          disabled={isLastStage || !stageCompleted}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GameControls;


import { Button } from "@/components/ui/button";
import { Play, PlayCircle, Trash2 } from "lucide-react";

interface ForgeHeaderProps {
  clearWorkflow: () => void;
  handleTestRun: () => void;
  handleRun: () => void;
}

export const ForgeHeader = ({
  clearWorkflow,
  handleTestRun,
  handleRun,
}: ForgeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Forge
        </h1>
        <p className="text-gray-600 mt-2">
          Build powerful AI workflows to automate business tasks and gain insights
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={clearWorkflow}
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleTestRun}
        >
          <PlayCircle className="h-4 w-4" />
          Test Run
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={handleRun}
        >
          <Play className="h-4 w-4" />
          Run Workflow
        </Button>
      </div>
    </div>
  );
};

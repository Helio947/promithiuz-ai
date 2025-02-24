
import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleProgressProps {
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const ModuleProgress = ({
  title,
  description,
  isLocked,
  isCompleted,
  onClick
}: ModuleProgressProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-6 rounded-lg border transition-all",
        isLocked 
          ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-75" 
          : "bg-white border-primary/20 hover:border-primary cursor-pointer shadow-sm"
      )}
      disabled={isLocked}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {title}
            {isLocked ? (
              <Lock className="w-4 h-4 text-gray-400" />
            ) : isCompleted ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : null}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default ModuleProgress;


import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";
import { aiBlocksTools } from "@/constants/forge";

interface AIToolInfoProps {
  blockType: string;
}

export const AIToolInfo = ({ blockType }: AIToolInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tools = aiBlocksTools[blockType] || [];

  if (tools.length === 0) return null;

  return (
    <div className="mt-2 text-xs">
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs flex items-center gap-1 text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Info className="h-3 w-3" />
        {isOpen ? (
          <>
            Hide AI Tools <ChevronUp className="h-3 w-3" />
          </>
        ) : (
          <>
            View AI Tools <ChevronDown className="h-3 w-3" />
          </>
        )}
      </Button>

      {isOpen && (
        <div className="mt-1 space-y-2 p-2 bg-gray-50 rounded-md">
          <h4 className="font-medium mb-1">Required AI Tools:</h4>
          {tools.map((tool, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="bg-gray-200 p-1 rounded-md">
                <div className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">{tool.name}</div>
                <div className="text-gray-500 text-[10px]">{tool.description}</div>
                <div className="text-[10px] text-primary mt-0.5">Provider: {tool.provider}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

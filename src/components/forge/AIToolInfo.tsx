
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";
import { aiBlocksTools } from "@/constants/forge";
import { cn } from "@/lib/utils";

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
          {tools.map((tool, index) => {
            const iconColor = 
              blockType === 'analyze-text' ? 'text-purple-500' :
              blockType === 'send-email' ? 'text-blue-500' :
              blockType === 'generate-image' ? 'text-pink-500' :
              blockType === 'chat-response' ? 'text-green-500' :
              blockType === 'analyze-data' ? 'text-orange-500' :
              blockType === 'social-post' ? 'text-indigo-500' :
              blockType === 'document' ? 'text-yellow-500' :
              blockType === 'web-action' ? 'text-sky-500' :
              blockType === 'notification' ? 'text-red-500' :
              blockType === 'database' ? 'text-emerald-500' :
              'text-gray-500';
            
            const bgColor = 
              blockType === 'analyze-text' ? 'bg-purple-100' :
              blockType === 'send-email' ? 'bg-blue-100' :
              blockType === 'generate-image' ? 'bg-pink-100' :
              blockType === 'chat-response' ? 'bg-green-100' :
              blockType === 'analyze-data' ? 'bg-orange-100' :
              blockType === 'social-post' ? 'bg-indigo-100' :
              blockType === 'document' ? 'bg-yellow-100' :
              blockType === 'web-action' ? 'bg-sky-100' :
              blockType === 'notification' ? 'bg-red-100' :
              blockType === 'database' ? 'bg-emerald-100' :
              'bg-gray-100';
            
            return (
              <div key={index} className="flex items-start gap-2">
                <div className={cn("p-1 rounded-md", bgColor)}>
                  <div className={cn("h-4 w-4", iconColor)} />
                </div>
                <div>
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-gray-500 text-[10px]">{tool.description}</div>
                  <div className="text-[10px] text-primary mt-0.5">Provider: {tool.provider}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

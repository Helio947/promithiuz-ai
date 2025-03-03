
import React from 'react';
import { cn } from "@/lib/utils";
import { Message } from "@/types/forge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  onAddBlock: (blockType: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAddBlock }) => {
  return (
    <div
      className={cn(
        "rounded-lg p-2 text-sm",
        message.sender === 'user' 
          ? "bg-primary/10 ml-4" 
          : "bg-secondary/10 mr-4"
      )}
    >
      {message.isTyping ? (
        <div className="flex space-x-1 items-center h-6">
          <span className="animate-pulse">...</span>
        </div>
      ) : (
        <>
          <p>{message.content}</p>
          {message.mentionedBlocks && message.mentionedBlocks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.mentionedBlocks.map((block, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-xs"
                  onClick={() => onAddBlock(block.type)}
                >
                  <Plus className="h-3 w-3" />
                  {block.label}
                </Button>
              ))}
            </div>
          )}
          {message.suggestedWorkflow && (
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => message.suggestedWorkflow && message.suggestedWorkflow.onApply()}
              >
                Create this workflow with {message.suggestedWorkflow.blocks.length} blocks
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

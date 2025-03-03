
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/types/forge";

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
            <div className="mt-2 flex flex-wrap gap-2">
              {message.mentionedBlocks.map((block, index) => (
                <Button
                  key={`${block.type}-${index}`}
                  size="sm"
                  variant="outline"
                  onClick={() => onAddBlock(block.type)}
                  className="mt-1 h-7 text-xs"
                >
                  Add {block.label}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

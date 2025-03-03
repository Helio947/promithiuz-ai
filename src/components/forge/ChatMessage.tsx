
import React from 'react';
import { cn } from "@/lib/utils";
import { Message } from "@/types/forge";

interface ChatMessageProps {
  message: Message;
  onAddBlock: (blockType: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
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
        <p>{message.content}</p>
      )}
    </div>
  );
};


import { useState, useEffect } from "react";
import { Message } from "@/types/prometheus-vision";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SuggestedQueries from "./SuggestedQueries";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

const ChatInterface = ({ messages, onSendMessage, isTyping }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      onSendMessage(content);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Title with glowing ring effect */}
      <div className="text-center mb-8 relative">
        <div className={cn(
          "absolute inset-0 rounded-full blur-3xl transition-opacity duration-500",
          "bg-gradient-to-r from-primary/50 to-secondary/50",
          isTyping ? "opacity-100" : "opacity-0"
        )} />
        <h1 className="text-4xl font-bold relative z-10">
          Promithiuz AI Vision
        </h1>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <MessageList messages={messages} />
        <SuggestedQueries onQuerySelect={handleSendMessage} />
        <MessageInput
          input={input}
          setInput={setInput}
          onSendMessage={handleSendMessage}
          isLoading={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatInterface;


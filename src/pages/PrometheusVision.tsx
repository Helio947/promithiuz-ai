
import { useState } from "react";
import Header from "@/components/Header";
import { Message } from "@/types/prometheus-vision";
import ChatInterface from "@/components/prometheus-vision/ChatInterface";
import { cn } from "@/lib/utils";

const PrometheusVision = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 relative">
            {/* Simple Ring */}
            <div className="relative w-40 h-40 mx-auto rounded-full">
              {/* Basic ring with animation */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "border-4 border-orange-500",
                  "rounded-full",
                  "transition-transform duration-1000",
                  "bg-orange-50/5",
                  isTyping ? "scale-105" : "scale-100"
                )}
              />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-8">
              Your business insights hub powered by AI
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ChatInterface 
              messages={messages}
              setMessages={setMessages}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrometheusVision;

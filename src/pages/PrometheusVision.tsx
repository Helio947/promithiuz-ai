
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
            {/* Glowing Ring */}
            <div className="relative w-40 h-40 mx-auto overflow-hidden rounded-full">
              {/* Outer glow layer */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-r from-primary via-secondary to-primary",
                  "transition-all duration-1000 ease-in-out",
                  "blur-2xl opacity-70",
                  "animate-glow",
                  isTyping ? "scale-110" : "scale-100"
                )}
              />
              {/* Middle glow layer */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-r from-primary via-secondary to-primary",
                  "transition-all duration-1000 ease-in-out",
                  "blur-xl opacity-50",
                  isTyping ? "scale-105" : "scale-100"
                )}
              />
              {/* Inner ring */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "border-4 border-primary",
                  "transition-all duration-1000",
                  "bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10",
                  isTyping ? "animate-pulse" : ""
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

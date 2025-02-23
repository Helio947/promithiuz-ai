
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
            {/* Minimalist Ring */}
            <div className="relative w-40 h-40 mx-auto">
              {/* Base ring */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "border-2",
                  "rounded-full",
                  "transition-all duration-500 ease-out",
                  "border-gray-200",
                  "bg-gradient-to-t from-gray-50 to-white",
                  isTyping ? "scale-110" : "scale-100"
                )}
              />
              
              {/* Glow ring */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "rounded-full",
                  "transition-all duration-300",
                  "bg-blue-100/20 blur-md",
                  isTyping ? "opacity-100 scale-105" : "opacity-0 scale-100"
                )}
              />
              
              {/* Inner circle with subtle glow */}
              <div 
                className={cn(
                  "absolute inset-6",
                  "rounded-full",
                  "bg-white",
                  "transition-all duration-300",
                  "border border-gray-100",
                  "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
                  "bg-gradient-to-t from-blue-50/40 to-transparent",
                  isTyping ? "from-blue-100/50" : "from-blue-50/40"
                )}
              >
                {/* Additional inner glow layer */}
                <div 
                  className={cn(
                    "absolute inset-0",
                    "rounded-full",
                    "bg-gradient-to-b from-white via-transparent to-blue-50/30",
                    "opacity-70",
                    "transition-opacity duration-300",
                    isTyping ? "opacity-90" : "opacity-70"
                  )}
                />
              </div>
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

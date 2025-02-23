
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
            {/* Quantum State Ring */}
            <div className="relative w-40 h-40 mx-auto">
              {/* Quantum particles effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400",
                    "opacity-20 blur-xl",
                    "animate-pulse"
                  )}
                />
              </div>
              
              {/* Main quantum ring */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "border-4 border-cyan-500",
                  "rounded-full",
                  "transition-all duration-700",
                  "bg-gradient-to-br from-cyan-500/10 to-blue-500/10",
                  isTyping ? "scale-110" : "scale-100",
                  "animate-[spin_8s_linear_infinite]"
                )}
              />
              
              {/* Inner quantum ring */}
              <div 
                className={cn(
                  "absolute inset-2",
                  "border-2 border-blue-400/50",
                  "rounded-full",
                  "transition-all duration-700",
                  isTyping ? "scale-105" : "scale-100",
                  "animate-[spin_6s_linear_infinite_reverse]"
                )}
              />
              
              {/* Energy particles */}
              <div 
                className={cn(
                  "absolute inset-4",
                  "rounded-full",
                  "bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-cyan-400/20",
                  "transition-opacity duration-1000",
                  "animate-pulse",
                  isTyping ? "opacity-100" : "opacity-50"
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


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
              {/* Quantum field backdrop */}
              <div className="absolute inset-0 rounded-full">
                <div 
                  className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500",
                    "opacity-10 blur-2xl",
                    "animate-[pulse_3s_ease-in-out_infinite]"
                  )}
                />
              </div>
              
              {/* Outer quantum ring */}
              <div 
                className={cn(
                  "absolute inset-0",
                  "border-[3px]",
                  "rounded-full",
                  "transition-all duration-500",
                  "border-cyan-400",
                  "bg-gradient-to-tr from-cyan-500/5 to-blue-400/5",
                  isTyping ? "scale-110" : "scale-100",
                  "animate-[spin_12s_linear_infinite]"
                )}
              />
              
              {/* Middle quantum ring */}
              <div 
                className={cn(
                  "absolute inset-4",
                  "border-2 border-dashed border-blue-300/40",
                  "rounded-full",
                  "transition-all duration-700",
                  isTyping ? "scale-105 rotate-180" : "scale-100 rotate-0",
                  "animate-[spin_8s_linear_infinite_reverse]"
                )}
              />
              
              {/* Inner quantum core */}
              <div 
                className={cn(
                  "absolute inset-8",
                  "rounded-full",
                  "bg-gradient-to-br from-cyan-400/30 to-blue-500/30",
                  "transition-all duration-300",
                  "animate-[pulse_2s_ease-in-out_infinite]",
                  isTyping ? "opacity-90 scale-110" : "opacity-40 scale-100"
                )}
              >
                <div className={cn(
                  "absolute inset-2",
                  "rounded-full",
                  "bg-gradient-to-r from-cyan-200/20 via-blue-300/20 to-cyan-200/20",
                  "blur-sm",
                  "animate-[spin_4s_linear_infinite]"
                )} />
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

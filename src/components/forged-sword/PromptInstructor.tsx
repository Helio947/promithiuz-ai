
import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/prometheus-vision";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import analytics from "@/utils/analytics";

const PromptInstructor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! I'm your Prompt Engineering Instructor. I'm here to help you learn how to effectively communicate with AI language models like me. Whether you're new to prompt engineering or looking to refine your skills, I can guide you through creating simple to complex prompts for various business purposes. What would you like to learn about today?",
      id: "welcome",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input,
      id: `user-${Date.now()}`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Track the event
      analytics.trackEvent("prompt_instructor_message", { 
        messageLength: input.length,
      });
      
      const { data, error } = await supabase.functions.invoke('prompt-instructor', {
        body: { prompt: input }
      });
      
      if (error) {
        throw error;
      }
      
      const aiMessage: Message = {
        role: "assistant",
        content: data.message,
        id: `assistant-${Date.now()}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
      
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        id: `error-${Date.now()}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSuggestedPrompts = () => [
    "How do I write a basic prompt for content creation?",
    "What's the structure of a good customer support prompt?",
    "How can I use context effectively in my prompts?",
    "What are some examples of complex prompts for business analysis?",
    "How do I specify the tone and format in my prompts?"
  ];

  return (
    <Card className="w-full h-[600px] flex flex-col overflow-hidden bg-white shadow-sm border-gray-200">
      <CardContent className="flex flex-col h-full p-0">
        <div className="bg-primary/10 p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Prompt Engineering Instructor</h3>
          <p className="text-sm text-muted-foreground">Learn how to craft effective prompts for text-based AI models</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2 max-w-[75%]">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <p className="text-sm text-center text-muted-foreground mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {getSuggestedPrompts().map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setInput(prompt);
                    handleSendMessage();
                  }}
                >
                  {prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 flex gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[60px] flex-1 resize-none"
            disabled={isTyping}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromptInstructor;

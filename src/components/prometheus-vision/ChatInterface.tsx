
import { useState } from "react";
import { Message } from "@/types/prometheus-vision";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SuggestedQueries from "./SuggestedQueries";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

const ChatInterface = ({ messages, setMessages, isTyping, setIsTyping }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");

  const handleSendMessage = (content: string) => {
    if (content.trim()) {
      onSendMessage(content);
      setInput("");
    }
  };

  const onSendMessage = async (content: string) => {
    const newMessage: Message = {
      role: 'user',
      content,
      id: Math.random().toString(),
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    
    // Start AI response
    setIsTyping(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { prompt: content }
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: 'assistant',
        content: data.generatedText,
        id: Math.random().toString(),
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        id: Math.random().toString(),
        timestamp: new Date()
      };
      setMessages([...messages, newMessage, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <MessageList messages={messages} isTyping={isTyping} />
        <SuggestedQueries 
          queries={[
            "Show me sales trends",
            "Analyze customer feedback",
            "Revenue forecast"
          ]} 
          onSelectQuery={handleSendMessage} 
        />
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

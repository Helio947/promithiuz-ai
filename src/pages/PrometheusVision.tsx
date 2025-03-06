import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Message } from "@/types/prometheus-vision";
import ChatInterface from "@/components/prometheus-vision/ChatInterface";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/types/profile";
import { incrementProfileMetric } from "@/utils/profile-utils";
import SuggestedQueries from "@/components/prometheus-vision/SuggestedQueries";
import { Eye } from "lucide-react";

const PrometheusVision = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestedQueries, setSuggestedQueries] = useState([
    "Show me sales trends",
    "Analyze customer feedback",
    "Revenue forecast"
  ]);
  const session = useSession();
  const supabase = useSupabaseClient();

  const incrementAIQueryCount = async () => {
    if (!session?.user?.id) return;
    
    await incrementProfileMetric(session.user.id, 'ai_queries_used');
  };

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      role: 'user',
      content,
      id: Math.random().toString(),
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    
    setLoading(true);
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
      
      await incrementAIQueryCount();
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        id: Math.random().toString(),
        timestamp: new Date()
      };
      setMessages([...messages, newMessage, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryClick = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Prometheus Vision</h1>
        <ChatInterface 
          messages={messages}
          setMessages={setMessages}
          isTyping={loading}
          setIsTyping={setLoading}
          onSendMessage={handleSendMessage}
        />
        <SuggestedQueries 
          queries={suggestedQueries} 
          onSelectQuery={handleQueryClick} 
        />
      </div>
    </div>
  );
};

export default PrometheusVision;

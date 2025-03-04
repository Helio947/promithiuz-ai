
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChatInterface from "@/components/prometheus-vision/ChatInterface";
import BusinessMetricsGrid from "@/components/prometheus-vision/BusinessMetricsGrid";
import SuggestedQueries from "@/components/prometheus-vision/SuggestedQueries";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BusinessContext {
  industry: string;
  size: string;
  goal: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PrometheusVision = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [businessContext, setBusinessContext] = useState<BusinessContext>({
    industry: "Tech",
    size: "Small",
    goal: "Growth"
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content: "Hello! I'm your Promithiuz Vision AI assistant. How can I help your business today?",
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to access Promithiuz Vision", {
          description: "You'll be redirected to the login page."
        });
        
        // Delay redirect to allow toast to be seen
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      }
      
      setAuthChecking(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Format previous messages for the API
      const previousMessages = messages
        .filter(msg => msg.id !== "welcome-message") // Exclude welcome message
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Get session for auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Authentication required");
      }
      
      // Call the business-insights edge function
      const { data, error } = await supabase.functions.invoke('business-insights', {
        body: {
          query: content,
          businessContext,
          previousMessages: previousMessages.slice(-4) // Send last 4 messages for context
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update AI queries used count
      await supabase
        .from('profiles')
        .update({ 
          ai_queries_used: supabase.rpc('increment', { x: 1 }) 
        })
        .eq('id', session.user.id);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get AI response", {
        description: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQueryClick = (query: string) => {
    handleSendMessage(query);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
        <Header />
        <div className="pt-24 container mx-auto px-4 flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <span>Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <Header />
      <main className="pt-24 pb-12 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Promithiuz Vision
            </h1>
            <p className="text-gray-600">
              Analyze your business data, discover insights, and get AI-powered recommendations to grow your business.
            </p>
            
            <ChatInterface 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              loading={loading}
            />
          </div>
          
          <div className="space-y-6">
            <BusinessMetricsGrid />
            
            <SuggestedQueries onQueryClick={handleQueryClick} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrometheusVision;


import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Brain, Users, Target, BarChart, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const nodes = [
  {
    title: "Sales & Revenue",
    icon: BarChart,
    color: "from-blue-500 to-blue-600",
    description: "Track revenue trends and sales performance"
  },
  {
    title: "Marketing & Outreach",
    icon: Target,
    color: "from-purple-500 to-purple-600",
    description: "Analyze campaign performance and reach"
  },
  {
    title: "Customer Engagement",
    icon: Users,
    color: "from-green-500 to-green-600",
    description: "Monitor customer satisfaction and interactions"
  },
  {
    title: "Operational Efficiency",
    icon: Brain,
    color: "from-orange-500 to-orange-600",
    description: "Optimize workflows and resource utilization"
  }
];

const PrometheusVision = () => {
  const [healthScore, setHealthScore] = useState(85);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate health score changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = Math.random() * 10 - 5;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response - replace with actual AI integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = `Based on your query "${userMessage}", here's what I found in your business data...`;
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Prometheus Vision
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your business insights hub powered by AI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Health Score and Nodes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Central Pulse Animation */}
              <div className="relative w-48 h-48 mx-auto mb-16">
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full",
                    "bg-gradient-to-r from-primary to-secondary",
                    "animate-pulse shadow-lg",
                    healthScore > 70 ? "opacity-90" : healthScore > 40 ? "opacity-70" : "opacity-50"
                  )}
                />
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{Math.round(healthScore)}%</div>
                    <div className="text-sm text-gray-600">Health Score</div>
                  </div>
                </div>
              </div>

              {/* Interactive Nodes */}
              <div className="grid md:grid-cols-2 gap-6">
                {nodes.map((node, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedNode(selectedNode === index ? null : index)}
                    className={cn(
                      "relative p-6 rounded-2xl transition-all duration-300",
                      "bg-white hover:shadow-lg",
                      "border-2",
                      selectedNode === index ? "border-primary scale-105" : "border-gray-100 hover:border-primary/50",
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-lg mb-4",
                      "bg-gradient-to-br",
                      node.color,
                      "flex items-center justify-center"
                    )}>
                      <node.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
                    <p className="text-sm text-gray-600">{node.description}</p>
                    
                    <div className={cn(
                      "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                      "bg-gradient-to-r from-primary to-secondary",
                      selectedNode === index && "opacity-10"
                    )} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Ask Prometheus Interface */}
            <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px] flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Ask Prometheus</h2>
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg max-w-[80%]",
                      message.role === 'user' 
                        ? "bg-primary text-white ml-auto" 
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {message.content}
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    Ask me anything about your business metrics and I'll analyze the data for you.
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t pt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrometheusVision;

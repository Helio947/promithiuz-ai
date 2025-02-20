import { useCallback, useRef, useState } from 'react';
import Header from "@/components/Header";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  XYPosition,
} from '@xyflow/react';
import { Button } from "@/components/ui/button";
import { Play, PlayCircle, Settings, MessageSquare, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AIBlockNode } from '@/components/forge/AIBlockNode';
import { DraggableBlock } from '@/components/forge/DraggableBlock';
import '@xyflow/react/dist/style.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'prometheus';
  timestamp: Date;
  isTyping?: boolean;
  mentionedBlocks?: Array<{
    type: string;
    label: string;
  }>;
}

const quickTips = [
  "How do I connect blocks?",
  "What does each color mean?",
  "How do I test my workflow?",
  "Show me example workflows",
];

const nodeTypes = {
  aiBlock: AIBlockNode,
};

const initialNodes: Node[] = [
  {
    id: 'welcome',
    type: 'aiBlock',
    data: { label: 'Start Here', type: 'chat-response' },
    position: { x: 250, y: 5 },
  },
];

const aiBlocks = [
  { type: 'analyze-text' as const, label: 'Analyze Text' },
  { type: 'send-email' as const, label: 'Send Email' },
  { type: 'generate-image' as const, label: 'Generate Image' },
  { type: 'chat-response' as const, label: 'Chat Response' },
  { type: 'analyze-data' as const, label: 'Analyze Data' },
  { type: 'social-post' as const, label: 'Social Media Post' },
  { type: 'document' as const, label: 'Document Action' },
  { type: 'web-action' as const, label: 'Web Action' },
  { type: 'notification' as const, label: 'Send Notification' },
  { type: 'database' as const, label: 'Database Action' },
];

const Forge = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isTestMode, setIsTestMode] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to The Forge! I'm Prometheus, your AI guide. How can I help you build your workflow today?",
      sender: 'prometheus',
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const simulateTyping = (response: string, mentionedBlocks: Array<{ type: string; label: string }> = []) => {
    const tempId = Date.now().toString();
    
    // Add typing indicator
    setMessages(prev => [...prev, {
      id: tempId,
      content: '',
      sender: 'prometheus',
      timestamp: new Date(),
      isTyping: true,
    }]);

    // Simulate AI thinking time
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? {
              ...msg,
              content: response,
              isTyping: false,
              mentionedBlocks,
            }
          : msg
      ));
      scrollToBottom();
    }, 1500);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setQuestion('');
    scrollToBottom();

    // Simulate Prometheus response
    simulateTyping(
      "I'll help you with that! You can start by dragging blocks from the toolbox to the canvas. Each block has a specific purpose.",
      [{ type: 'chat-response', label: 'Chat Response' }]
    );

    toast({
      title: "Message sent",
      description: "Prometheus is thinking about your question...",
    });
  };

  const handleQuickTip = (tip: string) => {
    setQuestion(tip);
  };

  const addBlockToCanvas = (blockType: string) => {
    if (!reactFlowWrapper.current) return;
    
    const position = {
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
    };

    const newNode = {
      id: `${blockType}-${Date.now()}`,
      type: 'aiBlock',
      position,
      data: { label: aiBlocks.find(block => block.type === blockType)?.label || 'New Block', type: blockType },
    };

    setNodes(nds => nds.concat(newNode));
    
    toast({
      title: "Block Added",
      description: "New AI block has been added to your workflow!",
    });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        // Check if connection already exists
        const connectionExists = eds.some(
          edge => edge.source === params.source && edge.target === params.target
        );
        
        if (connectionExists) {
          toast({
            title: "Connection exists",
            description: "These blocks are already connected!",
          });
          return eds;
        }

        toast({
          title: "Blocks Connected",
          description: "Your AI blocks are now linked together!",
        });
        return addEdge(params, eds);
      });
    },
    [setEdges, toast]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position: XYPosition = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'aiBlock',
        position,
        data: { label: aiBlocks.find(block => block.type === type)?.label || 'New Block', type },
      };

      setNodes((nds) => nds.concat(newNode));
      
      toast({
        title: "Block Added",
        description: "New AI block has been added to your workflow!",
      });
    },
    [setNodes, toast]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleTestRun = () => {
    setIsTestMode(true);
    toast({
      title: "Test Mode Activated",
      description: "Your workflow is now in test mode. Any actions will be simulated.",
    });
  };

  const handleRun = () => {
    if (nodes.length < 2) {
      toast({
        title: "Workflow Empty",
        description: "Add some blocks to your workflow before running it!",
        variant: "destructive",
      });
      return;
    }

    if (edges.length === 0) {
      toast({
        title: "No Connections",
        description: "Connect your blocks together before running the workflow!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Workflow Running",
      description: "Your workflow has been activated and is now running.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                The Forge
              </h1>
              <p className="text-gray-600 mt-2">
                Build powerful AI workflows with drag-and-drop simplicity
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleTestRun}
              >
                <PlayCircle className="h-4 w-4" />
                Test Run
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={handleRun}
              >
                <Play className="h-4 w-4" />
                Run Workflow
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Canvas */}
            <div className="col-span-9 bg-white rounded-xl border shadow-sm h-[600px] relative" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDragOver={onDragOver}
                onDrop={onDrop}
                nodeTypes={nodeTypes}
                fitView
                className="bg-dots"
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>

            {/* Toolbox & Prometheus */}
            <div className="col-span-3 space-y-6">
              {/* Prometheus Assistant */}
              <div className="bg-white rounded-xl border p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Prometheus</h3>
                    <p className="text-sm text-gray-500">Your AI Guide</p>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {quickTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => handleQuickTip(tip)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {tip}
                    </button>
                  ))}
                </div>

                {/* Chat History */}
                <div 
                  ref={chatContainerRef}
                  className="mb-4 h-[200px] overflow-y-auto space-y-3 border rounded-lg p-3"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "rounded-lg p-3 text-sm",
                        message.sender === 'user' 
                          ? "bg-primary/10 ml-4" 
                          : "bg-secondary/10 mr-4"
                      )}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1 items-center h-6">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      ) : (
                        <>
                          <p className="mb-1">{message.content}</p>
                          {message.mentionedBlocks && message.mentionedBlocks.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.mentionedBlocks.map((block) => (
                                <div
                                  key={block.type}
                                  className="flex items-center justify-between bg-white rounded p-2 border text-xs"
                                >
                                  <span>{block.label}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => addBlockToCanvas(block.type)}
                                    className="h-6 px-2"
                                  >
                                    <Plus className="h-3 w-3" />
                                    Add
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          <span className="text-[10px] text-gray-500 mt-1 inline-block">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask me anything about The Forge..."
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button type="submit" size="sm">Ask</Button>
                </form>
              </div>

              {/* AI Blocks Toolbox */}
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    AI Blocks
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {aiBlocks.map((block) => (
                    <DraggableBlock
                      key={block.type}
                      type={block.type}
                      label={block.label}
                      onDragStart={onDragStart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forge;

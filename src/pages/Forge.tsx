
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
import { Play, PlayCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AIBlockNode } from '@/components/forge/AIBlockNode';
import { PrometheusChat } from '@/components/forge/PrometheusChat';
import { AIBlocksToolbox } from '@/components/forge/AIBlocksToolbox';
import { TemplatesLibrary } from '@/components/forge/TemplatesLibrary';
import { TestSimulator } from '@/components/forge/TestSimulator';
import { initialNodes, aiBlocks } from '@/constants/forge';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  aiBlock: AIBlockNode,
};

const Forge = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isTestMode, setIsTestMode] = useState(false);
  const { toast } = useToast();

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
    if (nodes.length === 0) {
      toast({
        title: "No Nodes Found",
        description: "Add some blocks to your workflow before running a test.",
        variant: "destructive",
      });
      return;
    }
    setIsTestMode(true);
    toast({
      title: "Test Mode Activated",
      description: "Your workflow is now in test mode. Any actions will be simulated.",
    });
  };

  const handleTestComplete = () => {
    setIsTestMode(false);
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

  const handleTemplateSelect = (templateNodes: Node[], templateEdges: Edge[]) => {
    setNodes(templateNodes);
    setEdges(templateEdges);
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
            <div className="col-span-9">
              <div className="bg-white rounded-xl border shadow-sm h-[600px] relative mb-6" ref={reactFlowWrapper}>
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
              <AIBlocksToolbox onDragStart={onDragStart} />
            </div>

            <div className="col-span-3 space-y-6">
              <PrometheusChat onAddBlock={addBlockToCanvas} />
              {isTestMode ? (
                <TestSimulator 
                  nodes={nodes}
                  edges={edges}
                  onTestComplete={handleTestComplete}
                />
              ) : (
                <TemplatesLibrary onTemplateSelect={handleTemplateSelect} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forge;

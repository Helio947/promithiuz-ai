
import { useCallback, useState } from 'react';
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
} from '@xyflow/react';
import { Button } from "@/components/ui/button";
import { Play, PlayCircle, Settings, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import '@xyflow/react/dist/style.css';

// Node types
const nodeTypes = {
  // We'll add custom node types here
};

const initialNodes: Node[] = [
  {
    id: 'welcome',
    type: 'special',
    data: { label: 'Welcome to The Forge!' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges: Edge[] = [];

const Forge = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isTestMode, setIsTestMode] = useState(false);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleTestRun = () => {
    setIsTestMode(true);
    toast({
      title: "Test Mode Activated",
      description: "Your workflow is now in test mode. Any actions will be simulated.",
    });
  };

  const handleRun = () => {
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
            <div className="col-span-9 bg-white rounded-xl border shadow-sm h-[600px] relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-dots"
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>

            {/* Toolbox & Promi */}
            <div className="col-span-3 space-y-6">
              {/* Promi Assistant */}
              <div className="bg-white rounded-xl border p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Promi</h3>
                    <p className="text-sm text-gray-500">Your AI Guide</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Drag AI blocks from the toolbox below onto the canvas to start building your workflow. 
                  Need help? Just ask!
                </p>
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
                  {/* We'll add draggable blocks here */}
                  <div className="p-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center text-sm text-gray-500">
                    AI Blocks coming soon...
                  </div>
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

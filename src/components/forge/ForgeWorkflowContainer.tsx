
import { useCallback, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { aiBlocks, initialNodes } from '@/constants/forge';
import { useNodesState, useEdgesState, Node, Edge, Connection, addEdge, XYPosition } from '@xyflow/react';
import { ForgeHeader } from './ForgeHeader';
import { AIBlocksToolbox } from './AIBlocksToolbox';
import { TemplatesLibrary } from './TemplatesLibrary';
import { TestSimulator } from './TestSimulator';
import { PrometheusChat } from './PrometheusChat';
import { WorkflowCanvas } from './WorkflowCanvas';

export const ForgeWorkflowContainer = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isTestMode, setIsTestMode] = useState(false);
  const { toast } = useToast();

  // Function to remove a specific node
  const onNodeDelete = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    // Also remove any connected edges
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
    
    toast({
      title: "Block Removed",
      description: "The block has been removed from your workflow.",
    });
  }, [setNodes, setEdges, toast]);

  // Function to clear all nodes and edges
  const clearWorkflow = useCallback(() => {
    if (nodes.length === 0 && edges.length === 0) {
      toast({
        title: "Workflow Already Empty",
        description: "There are no blocks to clear.",
      });
      return;
    }
    
    setNodes([]);
    setEdges([]);
    
    toast({
      title: "Workflow Cleared",
      description: "All blocks and connections have been removed.",
    });
  }, [nodes, edges, setNodes, setEdges, toast]);

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
      data: { 
        label: aiBlocks.find(block => block.type === blockType)?.label || 'New Block', 
        type: blockType,
        onNodeDelete, // Pass the delete handler to the node data
      },
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

      if (!reactFlowWrapper.current) {
        return;
      }

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
        data: { 
          label: aiBlocks.find(block => block.type === type)?.label || 'New Block', 
          type,
          onNodeDelete, // Pass the delete handler to the node data
        },
      };

      setNodes((nds) => nds.concat(newNode));
      
      toast({
        title: "Block Added",
        description: "New AI block has been added to your workflow!",
      });
    },
    [setNodes, toast, onNodeDelete]
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
    // Update node data to include the onNodeDelete handler
    const nodesWithDeleteHandler = templateNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onNodeDelete,
      }
    }));
    
    setNodes(nodesWithDeleteHandler);
    setEdges(templateEdges);
  };

  return (
    <>
      <ForgeHeader 
        clearWorkflow={clearWorkflow}
        handleTestRun={handleTestRun}
        handleRun={handleRun}
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <AIBlocksToolbox onDragStart={onDragStart} />
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
        
        <div className="col-span-6" ref={reactFlowWrapper}>
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        </div>

        <div className="col-span-3 space-y-6">
          <PrometheusChat onAddBlock={addBlockToCanvas} />
        </div>
      </div>
    </>
  );
};

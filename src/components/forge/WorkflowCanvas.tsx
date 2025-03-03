
import { ReactFlow, Background, Controls, MiniMap, Node, Edge, Connection, addEdge } from '@xyflow/react';
import { useCallback, useRef } from 'react';
import { AIBlockNode } from './AIBlockNode';

const nodeTypes = {
  aiBlock: AIBlockNode,
};

interface WorkflowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}

export const WorkflowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDragOver,
  onDrop,
}: WorkflowCanvasProps) => {
  return (
    <div 
      className="bg-white rounded-xl border shadow-sm h-[600px] relative mb-6" 
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        deleteKeyCode="Delete"
        fitView
        className="bg-dots"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute top-4 right-4 bg-white/80 text-xs text-gray-500 p-2 rounded-md backdrop-blur-sm">
        Drag blocks from the left panel • Press Delete key to remove selected blocks
      </div>
    </div>
  );
};

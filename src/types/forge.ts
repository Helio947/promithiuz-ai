
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'prometheus';
  timestamp: Date;
  isTyping?: boolean;
  mentionedBlocks?: Array<{
    type: string;
    label: string;
  }>;
  suggestedWorkflow?: {
    blocks: Array<{
      type: string;
      label: string;
      position: { x: number; y: number };
    }>;
    edges: Array<{
      source: string;
      target: string;
    }>;
    onApply: () => void;
  };
}

export interface AIBlock {
  type: string;
  label: string;
}

export interface AITools {
  name: string;
  description: string;
  provider: string;
  icon?: string;
}

export interface SimulationResult {
  nodeId: string;
  status: 'success' | 'error' | 'running';
  duration: number;
  cost: number;
  output: string;
  error?: string;
}

export interface SimulationSummary {
  totalCost: number;
  totalDuration: number;
  successfulNodes: number;
  failedNodes: number;
}

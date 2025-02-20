
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
}

export interface AIBlock {
  type: string;
  label: string;
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


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

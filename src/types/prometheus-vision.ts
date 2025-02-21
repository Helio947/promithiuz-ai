
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  timestamp: Date;
}

export interface BusinessNode {
  title: string;
  icon: any;
  color: string;
  description: string;
}


export const quickTips = [
  "How do I connect blocks?",
  "What does each color mean?",
  "How do I test my workflow?",
  "Show me example workflows",
];

export const aiBlocks = [
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

export const initialNodes = [
  {
    id: 'welcome',
    type: 'aiBlock',
    data: { label: 'Start Here', type: 'chat-response' },
    position: { x: 250, y: 5 },
  },
];

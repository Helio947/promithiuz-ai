import { Node } from '@xyflow/react';

export const quickTips = [
  "How do I connect blocks?",
  "What does each color mean?",
  "How do I test my workflow?",
  "Show me example workflows",
  "Help me get started",
  "How do I remove a block?",
];

export const initialNodes: Node[] = [
  {
    id: 'welcome',
    type: 'aiBlock',
    data: { label: 'Start Here', type: 'chat-response' },
    position: { x: 250, y: 5 },
  },
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

export const workflowTemplates = [
  {
    id: 'customer-support',
    name: 'Customer Support Automation',
    description: 'Automatically handle customer inquiries and route complex issues to human agents.',
    nodes: [
      {
        id: 'incoming-message',
        type: 'aiBlock',
        data: { label: 'Analyze Message', type: 'analyze-text' },
        position: { x: 50, y: 50 },
      },
      {
        id: 'generate-response',
        type: 'aiBlock',
        data: { label: 'Generate Response', type: 'chat-response' },
        position: { x: 300, y: 50 },
      },
      {
        id: 'send-notification',
        type: 'aiBlock',
        data: { label: 'Alert Agent', type: 'notification' },
        position: { x: 300, y: 200 },
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'incoming-message',
        target: 'generate-response',
      },
      {
        id: 'e1-3',
        source: 'incoming-message',
        target: 'send-notification',
      }
    ]
  },
  {
    id: 'content-pipeline',
    name: 'Content Marketing Pipeline',
    description: 'Generate, review, and schedule content across multiple platforms.',
    nodes: [
      {
        id: 'generate-content',
        type: 'aiBlock',
        data: { label: 'Generate Content', type: 'chat-response' },
        position: { x: 50, y: 50 },
      },
      {
        id: 'create-image',
        type: 'aiBlock',
        data: { label: 'Create Image', type: 'generate-image' },
        position: { x: 300, y: 50 },
      },
      {
        id: 'post-content',
        type: 'aiBlock',
        data: { label: 'Post to Social', type: 'social-post' },
        position: { x: 550, y: 50 },
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'generate-content',
        target: 'create-image',
      },
      {
        id: 'e2-3',
        source: 'create-image',
        target: 'post-content',
      }
    ]
  },
  {
    id: 'lead-qualification',
    name: 'Sales Lead Qualification',
    description: 'Analyze and score leads before routing them to your sales team.',
    nodes: [
      {
        id: 'analyze-lead',
        type: 'aiBlock',
        data: { label: 'Analyze Lead', type: 'analyze-data' },
        position: { x: 50, y: 50 },
      },
      {
        id: 'store-data',
        type: 'aiBlock',
        data: { label: 'Store Lead Data', type: 'database' },
        position: { x: 300, y: 50 },
      },
      {
        id: 'send-email',
        type: 'aiBlock',
        data: { label: 'Send Email', type: 'send-email' },
        position: { x: 550, y: 50 },
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'analyze-lead',
        target: 'store-data',
      },
      {
        id: 'e2-3',
        source: 'store-data',
        target: 'send-email',
      }
    ]
  }
];

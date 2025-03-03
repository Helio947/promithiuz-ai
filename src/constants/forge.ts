
import { Node } from '@xyflow/react';
import { AITools } from '@/types/forge';

export const quickTips = [
  "How do I connect blocks?",
  "What does each color mean?",
  "How do I test my workflow?",
  "Show me example workflows",
  "Help me get started",
  "How do I remove a block?",
  "Create a customer support workflow",
  "Build a marketing content pipeline",
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

export const aiBlocksTools: Record<string, AITools[]> = {
  'analyze-text': [
    {
      name: 'GPT-4',
      description: 'Advanced natural language understanding for text analysis',
      provider: 'OpenAI',
    },
    {
      name: 'Llama 3',
      description: 'Open source LLM for text classification and sentiment analysis',
      provider: 'Meta AI',
    }
  ],
  'send-email': [
    {
      name: 'SendGrid API',
      description: 'Reliable email delivery service',
      provider: 'Twilio',
    }
  ],
  'generate-image': [
    {
      name: 'DALL-E 3',
      description: 'Advanced image generation from text prompts',
      provider: 'OpenAI',
    },
    {
      name: 'Stable Diffusion XL',
      description: 'Open source image generation model',
      provider: 'Stability AI',
    }
  ],
  'chat-response': [
    {
      name: 'Claude 3',
      description: 'Conversational AI with nuanced understanding',
      provider: 'Anthropic',
    },
    {
      name: 'GPT-4o',
      description: 'Fast, context-aware conversational responses',
      provider: 'OpenAI',
    }
  ],
  'analyze-data': [
    {
      name: 'Python Analytics',
      description: 'Data processing with pandas and numpy',
      provider: 'Python',
    },
    {
      name: 'TensorFlow',
      description: 'ML-based data analysis and prediction',
      provider: 'Google',
    }
  ],
  'social-post': [
    {
      name: 'Twitter API',
      description: 'Programmatic access to Twitter features',
      provider: 'Twitter/X',
    },
    {
      name: 'Meta Graph API',
      description: 'Facebook and Instagram integration',
      provider: 'Meta',
    }
  ],
  'document': [
    {
      name: 'DocuGen AI',
      description: 'Automated document creation and transformation',
      provider: 'Promithiuz',
    },
    {
      name: 'PDF Processing',
      description: 'Extract and manipulate PDF content',
      provider: 'Adobe',
    }
  ],
  'web-action': [
    {
      name: 'Puppeteer',
      description: 'Browser automation for web interactions',
      provider: 'Google',
    },
    {
      name: 'REST API Client',
      description: 'Make API calls to external services',
      provider: 'Promithiuz',
    }
  ],
  'notification': [
    {
      name: 'Twilio SMS',
      description: 'Send text messages programmatically',
      provider: 'Twilio',
    },
    {
      name: 'Push Notifications',
      description: 'Send alerts to mobile devices',
      provider: 'Firebase',
    }
  ],
  'database': [
    {
      name: 'Supabase',
      description: 'Open source Firebase alternative',
      provider: 'Supabase',
    },
    {
      name: 'MongoDB Atlas',
      description: 'Document database for flexible schemas',
      provider: 'MongoDB',
    }
  ]
};

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


import { useState, useEffect, useRef } from 'react';
import { Message } from "@/types/forge";
import { getResponseForQuestion } from "@/utils/chat-helpers";
import { aiBlocks } from '@/constants/forge';

type CreateWorkflowCallback = (nodes: any[], edges: any[]) => void;

export function useChat(onCreateWorkflow?: CreateWorkflowCallback) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      content: "👋 Hi there! I'm your AI assistant in The Forge! Think of me as your creative partner for building powerful workflows without any coding. You can create all sorts of automations - from customer support to content creation to lead qualification - just by connecting blocks together! What would you like to build today? Feel free to ask me anything!",
      sender: 'prometheus',
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Fixed typing simulation to prevent duplicates
  const simulateTyping = (response: string, mentionedBlocks?: Array<{type: string, label: string}>, suggestedWorkflow?: any) => {
    // Generate a unique ID that won't conflict with other messages
    const tempId = `prometheus-${Date.now()}`;
    
    // First add a typing indicator
    setMessages(prev => [...prev, {
      id: tempId,
      content: '',
      sender: 'prometheus',
      timestamp: new Date(),
      isTyping: true,
    }]);

    // Then replace the typing indicator with the actual message after a delay
    setTimeout(() => {
      setMessages(prev => {
        // Find and replace the typing indicator message
        return prev.map(msg => 
          msg.id === tempId 
          ? {
              ...msg,
              content: response,
              isTyping: false,
              mentionedBlocks,
              suggestedWorkflow,
            }
          : msg
        );
      });
    }, 500); // Even shorter typing delay for better UX
  };

  const createWorkflowForQuery = (query: string) => {
    // This function analyzes the query and creates a workflow based on it
    if (!onCreateWorkflow) return null;
    
    // Simple workflow patterns based on keywords in the query
    const lowerQuery = query.toLowerCase();
    let workflow = null;
    
    if (lowerQuery.includes('customer') && lowerQuery.includes('support')) {
      // Customer support workflow
      const nodes = [
        {
          id: `analyze-text-${Date.now()}`,
          type: 'analyze-text',
          label: 'Analyze Message',
          position: { x: 100, y: 100 },
        },
        {
          id: `chat-response-${Date.now()}`,
          type: 'chat-response',
          label: 'Generate Response',
          position: { x: 300, y: 100 },
        },
        {
          id: `notification-${Date.now()}`,
          type: 'notification',
          label: 'Alert Agent',
          position: { x: 300, y: 250 },
        }
      ];
      
      const edges = [
        {
          source: nodes[0].id,
          target: nodes[1].id,
        },
        {
          source: nodes[0].id,
          target: nodes[2].id,
        }
      ];
      
      workflow = {
        blocks: nodes.map(node => ({
          type: node.type,
          label: node.label,
          position: node.position,
        })),
        edges,
        onApply: () => {
          const flowNodes = nodes.map(node => ({
            id: node.id,
            type: 'aiBlock',
            position: node.position,
            data: { 
              label: node.label, 
              type: node.type,
            },
          }));
          
          const flowEdges = edges.map((edge, index) => ({
            id: `e-${index}-${Date.now()}`,
            source: edge.source,
            target: edge.target,
          }));
          
          onCreateWorkflow(flowNodes, flowEdges);
        }
      };
    } else if (lowerQuery.includes('content') || lowerQuery.includes('marketing')) {
      // Content marketing workflow
      const nodes = [
        {
          id: `chat-response-${Date.now()}`,
          type: 'chat-response',
          label: 'Generate Content',
          position: { x: 100, y: 100 },
        },
        {
          id: `generate-image-${Date.now()}`,
          type: 'generate-image',
          label: 'Create Image',
          position: { x: 300, y: 100 },
        },
        {
          id: `social-post-${Date.now()}`,
          type: 'social-post',
          label: 'Post to Social',
          position: { x: 500, y: 100 },
        }
      ];
      
      const edges = [
        {
          source: nodes[0].id,
          target: nodes[1].id,
        },
        {
          source: nodes[1].id,
          target: nodes[2].id,
        }
      ];
      
      workflow = {
        blocks: nodes.map(node => ({
          type: node.type,
          label: node.label,
          position: node.position,
        })),
        edges,
        onApply: () => {
          const flowNodes = nodes.map(node => ({
            id: node.id,
            type: 'aiBlock',
            position: node.position,
            data: { 
              label: node.label, 
              type: node.type,
            },
          }));
          
          const flowEdges = edges.map((edge, index) => ({
            id: `e-${index}-${Date.now()}`,
            source: edge.source,
            target: edge.target,
          }));
          
          onCreateWorkflow(flowNodes, flowEdges);
        }
      };
    } else if (lowerQuery.includes('sales') || lowerQuery.includes('lead')) {
      // Sales lead workflow
      const nodes = [
        {
          id: `analyze-data-${Date.now()}`,
          type: 'analyze-data',
          label: 'Analyze Lead',
          position: { x: 100, y: 100 },
        },
        {
          id: `database-${Date.now()}`,
          type: 'database',
          label: 'Store Lead Data',
          position: { x: 300, y: 100 },
        },
        {
          id: `send-email-${Date.now()}`,
          type: 'send-email',
          label: 'Send Email',
          position: { x: 500, y: 100 },
        }
      ];
      
      const edges = [
        {
          source: nodes[0].id,
          target: nodes[1].id,
        },
        {
          source: nodes[1].id,
          target: nodes[2].id,
        }
      ];
      
      workflow = {
        blocks: nodes.map(node => ({
          type: node.type,
          label: node.label,
          position: node.position,
        })),
        edges,
        onApply: () => {
          const flowNodes = nodes.map(node => ({
            id: node.id,
            type: 'aiBlock',
            position: node.position,
            data: { 
              label: node.label, 
              type: node.type,
            },
          }));
          
          const flowEdges = edges.map((edge, index) => ({
            id: `e-${index}-${Date.now()}`,
            source: edge.source,
            target: edge.target,
          }));
          
          onCreateWorkflow(flowNodes, flowEdges);
        }
      };
    }
    
    return workflow;
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message with unique ID
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Check if the message is asking about creating a workflow
    const isWorkflowRequest = question.toLowerCase().includes('workflow') || 
                             question.toLowerCase().includes('create') ||
                             question.toLowerCase().includes('build') ||
                             question.toLowerCase().includes('automate');
    
    // Get contextual response based on user question
    const { responseText } = getResponseForQuestion(question);
    
    // Clear input field first
    setQuestion('');
    
    // Check if the question mentions any block types
    const mentionedBlocks = aiBlocks.filter(block => 
      question.toLowerCase().includes(block.type.toLowerCase()) || 
      question.toLowerCase().includes(block.label.toLowerCase())
    );

    // Create workflow if requested
    const suggestedWorkflow = isWorkflowRequest ? createWorkflowForQuery(question) : undefined;
    
    // Then show the AI response
    simulateTyping(responseText, mentionedBlocks.length > 0 ? mentionedBlocks : undefined, suggestedWorkflow);
  };

  return {
    chatContainerRef,
    question,
    setQuestion,
    messages,
    handleQuestionSubmit,
  };
}

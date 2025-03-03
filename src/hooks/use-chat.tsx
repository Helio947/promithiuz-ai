
import { useState, useEffect, useRef } from 'react';
import { Message } from "@/types/forge";
import { getResponseForQuestion } from "@/utils/chat-helpers";

export function useChat() {
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
  const simulateTyping = (response: string) => {
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
            }
          : msg
        );
      });
    }, 500); // Even shorter typing delay for better UX
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
    
    // Get contextual response based on user question
    const { responseText } = getResponseForQuestion(question);
    
    // Clear input field first
    setQuestion('');
    
    // Then show the AI response
    simulateTyping(responseText);
  };

  return {
    chatContainerRef,
    question,
    setQuestion,
    messages,
    handleQuestionSubmit,
  };
}

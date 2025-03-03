
import { useState, useEffect, useRef } from 'react';
import { Message } from "@/types/forge";
import { getResponseForQuestion } from "@/utils/chat-helpers";

export function useChat() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      content: "Welcome to The Forge! How can I help you build your workflow today?",
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
  const simulateTyping = (response: string, mentionedBlocks: Array<{ type: string; label: string }> = []) => {
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
            }
          : msg
        );
      });
    }, 800); // Shorter typing delay for better UX
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
    const { responseText, blocks } = getResponseForQuestion(question);
    
    // Clear input field first
    setQuestion('');
    
    // Then show the AI response
    simulateTyping(responseText, blocks);
  };

  return {
    chatContainerRef,
    question,
    setQuestion,
    messages,
    handleQuestionSubmit,
  };
}

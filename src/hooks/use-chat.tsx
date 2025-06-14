import { useState, useRef, useCallback } from 'react';
import { Message } from '@/types/prometheus-vision';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string, imageUrl?: string) => {
    setIsLoading(true);
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      ...(imageUrl && { imageUrl })
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
            ...(msg.imageUrl && { imageUrl: msg.imageUrl })
          })),
          imageUrl
        }),
        signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body stream not available');
      }

      let partialResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const textDecoder = new TextDecoder();
        partialResponse += textDecoder.decode(value);

        setMessages(prev => {
          const assistantMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: partialResponse,
            timestamp: new Date()
          };
          const existingAssistantMessageIndex = prev.findIndex(m => m.role === 'assistant' && m.id === assistantMessage.id);
          if (existingAssistantMessageIndex > -1) {
            return prev.map((m, index) => index === existingAssistantMessageIndex ? assistantMessage : m);
          } else {
            return [...prev.filter(m => m.role !== 'assistant'), assistantMessage];
          }
        });
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error fetching chat response:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    stopGeneration
  };
};

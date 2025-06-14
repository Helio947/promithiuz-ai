
import { Message } from '@/types/prometheus-vision';

export const formatMessageForAPI = (message: Message) => {
  return {
    role: message.role,
    content: message.content,
    ...(message.imageUrl && { imageUrl: message.imageUrl })
  };
};

export const createUserMessage = (content: string, imageUrl?: string): Message => {
  return {
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: new Date(),
    ...(imageUrl && { imageUrl })
  };
};

export const createAssistantMessage = (content: string): Message => {
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content,
    timestamp: new Date()
  };
};

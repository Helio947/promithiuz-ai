
import { cn } from '@/lib/utils';
import { Brain, Mail, Image, MessageSquare, BarChart, Share2, FileText, Globe, BellRing, Database } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap = {
  'analyze-text': Brain,
  'send-email': Mail,
  'generate-image': Image,
  'chat-response': MessageSquare,
  'analyze-data': BarChart,
  'social-post': Share2,
  'document': FileText,
  'web-action': Globe,
  'notification': BellRing,
  'database': Database,
} as const;

const colorMap = {
  'analyze-text': 'bg-purple-100 border-purple-200',
  'send-email': 'bg-blue-100 border-blue-200',
  'generate-image': 'bg-pink-100 border-pink-200',
  'chat-response': 'bg-green-100 border-green-200',
  'analyze-data': 'bg-orange-100 border-orange-200',
  'social-post': 'bg-indigo-100 border-indigo-200',
  'document': 'bg-yellow-100 border-yellow-200',
  'web-action': 'bg-sky-100 border-sky-200',
  'notification': 'bg-red-100 border-red-200',
  'database': 'bg-emerald-100 border-emerald-200',
} as const;

const tooltipDescriptions = {
  'analyze-text': 'Analyze text content to understand sentiment, extract key information, or classify topics.',
  'send-email': 'Automatically send customized emails based on triggers or conditions.',
  'generate-image': 'Create AI-generated images from text descriptions or modify existing images.',
  'chat-response': 'Generate human-like conversational responses for chatbots or customer service.',
  'analyze-data': 'Process and analyze data to uncover patterns, trends, and insights.',
  'social-post': 'Create and schedule social media posts across different platforms.',
  'document': 'Generate, modify, or analyze documents and text files.',
  'web-action': 'Perform automated actions on websites or web applications.',
  'notification': 'Send notifications through various channels like SMS, push, or in-app alerts.',
  'database': 'Store, retrieve, or update data in your database systems.',
} as const;

interface DraggableBlockProps {
  type: keyof typeof iconMap;
  label: string;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const DraggableBlock = ({ type, label, onDragStart }: DraggableBlockProps) => {
  const Icon = iconMap[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "p-3 rounded-lg border-2 cursor-move",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              colorMap[type]
            )}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-[200px]">
          <p className="text-sm">{tooltipDescriptions[type]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

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
  'analyze-text': 'text-purple-500',
  'send-email': 'text-blue-500',
  'generate-image': 'text-pink-500',
  'chat-response': 'text-green-500',
  'analyze-data': 'text-orange-500',
  'social-post': 'text-indigo-500',
  'document': 'text-yellow-500',
  'web-action': 'text-sky-500',
  'notification': 'text-red-500',
  'database': 'text-emerald-500',
} as const;

const bgColorMap = {
  'analyze-text': 'bg-purple-100',
  'send-email': 'bg-blue-100',
  'generate-image': 'bg-pink-100',
  'chat-response': 'bg-green-100',
  'analyze-data': 'bg-orange-100',
  'social-post': 'bg-indigo-100',
  'document': 'bg-yellow-100',
  'web-action': 'bg-sky-100',
  'notification': 'bg-red-100',
  'database': 'bg-emerald-100',
} as const;

const tooltipDescriptions = {
  'analyze-text': 'Understand the meaning and emotion behind any text.',
  'send-email': 'Send automatic emails when something happens.',
  'generate-image': 'Create or edit images using AI.',
  'chat-response': 'Have AI respond to messages like a human.',
  'analyze-data': 'Find patterns and insights in your data.',
  'social-post': 'Create and schedule posts for social media.',
  'document': 'Create or change documents automatically.',
  'web-action': 'Do things on websites automatically.',
  'notification': 'Send alerts to users via SMS or apps.',
  'database': 'Save and retrieve information.',
} as const;

interface DraggableBlockProps {
  type: keyof typeof iconMap;
  label: string;
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const DraggableBlock = ({ type, label, onDragStart }: DraggableBlockProps) => {
  const Icon = iconMap[type];

  const handleDragStart = (event: React.DragEvent) => {
    // Make sure to clear any previous data
    event.dataTransfer.clearData();
    // Set the data with the node type
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
    // Call the provided onDragStart handler
    onDragStart(event, type);
    console.log('Drag started with type:', type);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="flex items-center gap-3 group"
            onDragStart={handleDragStart}
            draggable
          >
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl cursor-move",
                "transition-all duration-200 hover:scale-105",
                bgColorMap[type]
              )}
            >
              <Icon className={cn("h-5 w-5", colorMap[type])} />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-[200px]">
          <p className="text-sm">{tooltipDescriptions[type]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

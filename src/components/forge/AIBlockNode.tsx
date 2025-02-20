
import { Handle, Position } from '@xyflow/react';
import { Brain, Mail, Image, MessageSquare, BarChart, Share2, FileText, Globe, BellRing, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

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
};

const colorMap = {
  'analyze-text': 'bg-purple-100 border-purple-200 hover:border-purple-300',
  'send-email': 'bg-blue-100 border-blue-200 hover:border-blue-300',
  'generate-image': 'bg-pink-100 border-pink-200 hover:border-pink-300',
  'chat-response': 'bg-green-100 border-green-200 hover:border-green-300',
  'analyze-data': 'bg-orange-100 border-orange-200 hover:border-orange-300',
  'social-post': 'bg-indigo-100 border-indigo-200 hover:border-indigo-300',
  'document': 'bg-yellow-100 border-yellow-200 hover:border-yellow-300',
  'web-action': 'bg-sky-100 border-sky-200 hover:border-sky-300',
  'notification': 'bg-red-100 border-red-200 hover:border-red-300',
  'database': 'bg-emerald-100 border-emerald-200 hover:border-emerald-300',
};

export const AIBlockNode = ({ data }: { data: { label: string; type: keyof typeof iconMap } }) => {
  const Icon = iconMap[data.type];

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg shadow-sm border-2 min-w-[140px]",
        "transition-colors duration-200",
        colorMap[data.type]
      )}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 rounded-full bg-gray-400" />
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 rounded-full bg-gray-400" />
    </div>
  );
};

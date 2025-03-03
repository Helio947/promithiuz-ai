
import { Handle, Position } from '@xyflow/react';
import { Brain, Mail, Image, MessageSquare, BarChart, Share2, FileText, Globe, BellRing, Database, X } from 'lucide-react';
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
  'analyze-text': 'bg-purple-100 border-purple-300 text-purple-500',
  'send-email': 'bg-blue-100 border-blue-300 text-blue-500',
  'generate-image': 'bg-pink-100 border-pink-300 text-pink-500',
  'chat-response': 'bg-green-100 border-green-300 text-green-500',
  'analyze-data': 'bg-orange-100 border-orange-300 text-orange-500',
  'social-post': 'bg-indigo-100 border-indigo-300 text-indigo-500',
  'document': 'bg-yellow-100 border-yellow-300 text-yellow-500',
  'web-action': 'bg-sky-100 border-sky-300 text-sky-500',
  'notification': 'bg-red-100 border-red-300 text-red-500',
  'database': 'bg-emerald-100 border-emerald-300 text-emerald-500',
};

// Define the interface for the node data including the onNodeDelete function
interface AIBlockData {
  label: string;
  type: keyof typeof iconMap;
  onNodeDelete?: (id: string) => void;
}

export const AIBlockNode = ({ data, id }: { data: AIBlockData; id: string }) => {
  const Icon = iconMap[data.type];

  const handleDelete = (event: React.MouseEvent, deleteId: string) => {
    // Stop event propagation to prevent node selection
    event.stopPropagation();
    
    // Use the onNodeDelete callback passed via data
    if (data.onNodeDelete) {
      data.onNodeDelete(deleteId);
    }
  };

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-2 h-2 rounded-full bg-gray-400 -left-1" 
      />
      <div
        className={cn(
          "w-14 h-14 flex flex-col items-center justify-center rounded-lg shadow-sm border-2",
          "transition-all duration-200 hover:scale-105",
          colorMap[data.type]
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-2 h-2 rounded-full bg-gray-400 -right-1" 
      />
      
      {/* Delete button that appears on hover */}
      <button
        onClick={(e) => handleDelete(e, id)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Delete node"
      >
        <X className="h-3 w-3" />
      </button>
      
      {/* Label tooltip that appears on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {data.label}
      </div>
    </div>
  );
};

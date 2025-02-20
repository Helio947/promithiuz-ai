
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { workflowTemplates } from '@/constants/forge';
import { Node, Edge } from '@xyflow/react';

interface TemplatesLibraryProps {
  onTemplateSelect: (nodes: Node[], edges: Edge[]) => void;
}

export const TemplatesLibrary = ({ onTemplateSelect }: TemplatesLibraryProps) => {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = workflowTemplates.find(t => t.id === templateId);
    if (!template) return;

    onTemplateSelect(template.nodes, template.edges);
    setSelectedId(templateId);
    
    toast({
      title: "Template Loaded",
      description: `The ${template.name} template has been loaded into your workspace.`,
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Workflow Templates</h3>
      </div>
      <div className="p-4 space-y-4">
        {workflowTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
              ${selectedId === template.id 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
          >
            <h4 className="font-medium mb-1">{template.name}</h4>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

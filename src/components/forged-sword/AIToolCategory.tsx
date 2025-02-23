
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Tool {
  name: string;
  use: string;
  applications: string[];
}

interface AIToolCategoryProps {
  title: string;
  tools: Tool[];
  index: number;
}

const AIToolCategory = ({ title, tools, index }: AIToolCategoryProps) => {
  return (
    <AccordionItem key={`tools-${index}`} value={`tools-${index}`}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6">
          {tools.map((tool, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-primary mb-2">{tool.name}</h4>
              <p className="text-gray-600 mb-2">{tool.use}</p>
              <div className="flex flex-wrap gap-2">
                {tool.applications.map((app, j) => (
                  <span key={j} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AIToolCategory;

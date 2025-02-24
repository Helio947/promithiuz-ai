
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InteractiveExample from "./InteractiveExample";

interface StrategyCategoryProps {
  title: string;
  items: string[];
  index: number;
  examples?: Array<{
    title: string;
    description: string;
    defaultPrompt: string;
    exampleOutput: string;
  }>;
}

const StrategyCategory = ({ title, items, index, examples }: StrategyCategoryProps) => {
  return (
    <AccordionItem key={`strategy-${index}`} value={`strategy-${index}`}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6">
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          
          {examples && examples.length > 0 && (
            <div className="mt-8 space-y-6">
              <h4 className="font-medium text-lg">Interactive Examples</h4>
              {examples.map((example, i) => (
                <InteractiveExample
                  key={i}
                  title={example.title}
                  description={example.description}
                  defaultPrompt={example.defaultPrompt}
                  exampleOutput={example.exampleOutput}
                />
              ))}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default StrategyCategory;

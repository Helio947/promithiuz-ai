
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SystemApproachProps {
  title: string;
  steps: string[];
  index: number;
}

const SystemApproach = ({ title, steps, index }: SystemApproachProps) => {
  return (
    <AccordionItem key={`system-${index}`} value={`system-${index}`}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
              <span className="text-gray-600">{step}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SystemApproach;

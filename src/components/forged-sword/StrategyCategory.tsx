
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface StrategyCategoryProps {
  title: string;
  items: string[];
  index: number;
}

const StrategyCategory = ({ title, items, index }: StrategyCategoryProps) => {
  return (
    <AccordionItem key={`strategy-${index}`} value={`strategy-${index}`}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2" />
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default StrategyCategory;

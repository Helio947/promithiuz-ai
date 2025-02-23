
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BestPracticeCategoryProps {
  title: string;
  practices: string[];
  index: number;
}

const BestPracticeCategory = ({ title, practices, index }: BestPracticeCategoryProps) => {
  return (
    <AccordionItem key={`practice-${index}`} value={`practice-${index}`}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-3">
          {practices.map((item, i) => (
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

export default BestPracticeCategory;

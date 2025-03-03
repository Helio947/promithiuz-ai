
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingFeatureItemProps {
  name: string;
  description: string;
}

const PricingFeatureItem = ({ name, description }: PricingFeatureItemProps) => {
  return (
    <li className="flex items-start gap-2">
      <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <div className="flex items-center gap-1 group">
        <span className="text-gray-700 font-medium">{name}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help group-hover:text-primary transition-colors" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-3 bg-white shadow-lg border border-gray-200">
            <p className="text-sm">{description}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
};

export default PricingFeatureItem;

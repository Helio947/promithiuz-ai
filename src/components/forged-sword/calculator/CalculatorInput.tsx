
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

interface CalculatorInputProps {
  id: string;
  label: string;
  tooltip: string;
  value: string | number;
  type?: "text" | "number";
  onChange: (value: string) => void;
}

const CalculatorInput = ({
  id,
  label,
  tooltip,
  value,
  type = "text",
  onChange,
}: CalculatorInputProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              className="max-w-[250px] hover:bg-[#E5DEFF]"
            >
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input
        id={id}
        type={type}
        min={type === "number" ? "0" : undefined}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CalculatorInput;

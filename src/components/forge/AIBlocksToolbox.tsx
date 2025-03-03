
import { Settings } from "lucide-react";
import { DraggableBlock } from "./DraggableBlock";
import { aiBlocks } from "@/constants/forge";

interface AIBlocksToolboxProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const AIBlocksToolbox = ({ onDragStart }: AIBlocksToolboxProps) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm mb-6">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <Settings className="h-4 w-4" />
          AI Blocks
        </h3>
        <p className="text-xs text-gray-500 mt-1">Drag blocks to the workflow area</p>
      </div>
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {aiBlocks.map((block) => (
          <DraggableBlock
            key={block.type}
            type={block.type}
            label={block.label}
            onDragStart={onDragStart}
          />
        ))}
      </div>
      <div className="p-3 border-t">
        <p className="text-xs text-gray-600">
          <strong>How AI workflows help your business:</strong>
          <br />• Automate repetitive tasks
          <br />• Extract insights from data
          <br />• Create customer-facing content
          <br />• Connect your business systems
        </p>
      </div>
    </div>
  );
};

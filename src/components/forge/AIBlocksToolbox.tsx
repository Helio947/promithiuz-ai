
import { Settings } from "lucide-react";
import { DraggableBlock } from "./DraggableBlock";
import { aiBlocks } from "@/constants/forge";

interface AIBlocksToolboxProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const AIBlocksToolbox = ({ onDragStart }: AIBlocksToolboxProps) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <Settings className="h-4 w-4" />
          AI Blocks
        </h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        {aiBlocks.map((block) => (
          <DraggableBlock
            key={block.type}
            type={block.type}
            label={block.label}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

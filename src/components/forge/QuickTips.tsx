
import React from 'react';

interface QuickTipsProps {
  tips: string[];
  onTipClick: (tip: string) => void;
}

export const QuickTips: React.FC<QuickTipsProps> = ({ tips, onTipClick }) => {
  return (
    <div className="px-3 py-2 border-t flex gap-2 overflow-x-auto no-scrollbar">
      {tips.map((tip, index) => (
        <button
          key={`tip-${index}`}
          onClick={() => onTipClick(tip)}
          className="text-xs whitespace-nowrap px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          {tip}
        </button>
      ))}
    </div>
  );
};

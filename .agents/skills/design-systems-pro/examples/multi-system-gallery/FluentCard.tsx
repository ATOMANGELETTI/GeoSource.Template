import React from 'react';

export interface FluentCardProps {
  title: string;
  badge: string;
  content: string;
  onConfirm?: () => void;
}

export const FluentCard: React.FC<FluentCardProps> = ({
  title,
  badge,
  content,
  onConfirm,
}) => {
  return (
    <div className="w-full max-w-md bg-white dark:bg-[#202020] border border-[#D1D1D1] dark:border-[#3B3B3B] rounded-lg p-5 shadow-[0_3.2px_7.2px_0_rgba(0,0,0,0.13)] font-['Segoe_UI_Variable',Segoe_UI,sans-serif]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#242424] dark:text-[#F5F5F5]">
          {title}
        </h3>
        <span className="bg-[#E5F2FB] dark:bg-[#004578] text-[#0078D4] dark:text-[#60CDFF] text-xs font-semibold px-2.5 py-0.5 rounded">
          {badge}
        </span>
      </div>
      <p className="text-sm text-[#424242] dark:text-[#D1D1D1] mb-5 leading-normal">
        {content}
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={onConfirm}
          className="bg-[#0078D4] hover:bg-[#106EBE] active:bg-[#005A9E] text-white text-sm font-semibold py-1.5 px-4 rounded transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

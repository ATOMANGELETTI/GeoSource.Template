import React from 'react';

export interface Material3CardProps {
  title: string;
  subtitle: string;
  description: string;
  onAction?: () => void;
}

export const Material3Card: React.FC<Material3CardProps> = ({
  title,
  subtitle,
  description,
  onAction,
}) => {
  return (
    <div className="w-full max-w-md bg-[#FEF7FF] text-[#1D1B20] rounded-[28px] p-6 border border-[#CAC4D0] shadow-[0_2px_6px_2px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_8px_3px_rgba(0,0,0,0.15)] transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#EADDFF] text-[#21005D] text-xs font-medium px-3 py-1 rounded-full">
          Material You
        </span>
        <span className="text-xs text-[#79747E] font-medium">{subtitle}</span>
      </div>
      <h3 className="text-xl font-normal text-[#1D1B20] tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#49454F] leading-relaxed mb-6">
        {description}
      </p>
      <button
        onClick={onAction}
        className="w-full bg-[#6750A4] text-white hover:bg-[#533F89] active:bg-[#423073] font-medium text-sm py-2.5 px-6 rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#6750A4] focus-visible:ring-offset-2 outline-none"
      >
        Explore Feature
      </button>
    </div>
  );
};

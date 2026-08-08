import React from 'react';

export interface AppleHIGCardProps {
  title: string;
  category: string;
  body: string;
  onAction?: () => void;
}

export const AppleHIGCard: React.FC<AppleHIGCardProps> = ({
  title,
  category,
  body,
  onAction,
}) => {
  return (
    <div className="w-full max-w-md bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[20px] p-6 shadow-xl text-slate-900 dark:text-slate-100 font-[-apple-system,BlinkMacSystemFont]">
      <div className="text-[11px] font-semibold tracking-wider text-[#007AFF] uppercase mb-1">
        {category}
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-[15px] leading-snug text-slate-600 dark:text-slate-300 mb-6">
        {body}
      </p>
      <button
        onClick={onAction}
        className="w-full bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#004FB3] text-white text-[15px] font-semibold py-3 px-4 rounded-xl transition-all duration-150 active:scale-[0.98] outline-none"
      >
        Get Started
      </button>
    </div>
  );
};

import React from 'react';

export interface ShadcnCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const ShadcnCard: React.FC<ShadcnCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 shadow-sm p-6">
      <div className="flex flex-col space-y-1.5 mb-4">
        <h3 className="font-semibold leading-none tracking-tight text-xl">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      {children && <div className="mb-4">{children}</div>}
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 shadow hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 w-full">
        Save Changes
      </button>
    </div>
  );
};

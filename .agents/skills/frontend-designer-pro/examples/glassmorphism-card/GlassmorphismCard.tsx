import React from 'react';

interface GlassmorphismCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  onAction,
  actionLabel = 'Explore'
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10 dark:border-slate-800/80 dark:bg-slate-900/60">
      {/* Background Gradient Accent Spot */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-center space-x-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/20 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      {children && <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">{children}</div>}

      {/* Action Footer */}
      {onAction && (
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={onAction}
            className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:bg-primary-500 hover:shadow-primary-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

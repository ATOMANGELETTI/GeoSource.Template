import React, { memo } from 'react';

export interface ComponentTemplateProps {
  id: string;
  title: string;
  isActive?: boolean;
  onSelect?: (id: string) => void;
}

export const ComponentTemplate: React.FC<ComponentTemplateProps> = memo(({
  id,
  title,
  isActive = false,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect?.(id);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className={`flex items-center justify-between rounded-lg p-4 transition-colors ${
        isActive ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
      }`}
    >
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-slate-400">ID: {id}</span>
    </div>
  );
});

ComponentTemplate.displayName = 'ComponentTemplate';

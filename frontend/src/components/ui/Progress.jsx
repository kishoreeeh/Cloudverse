import { cn } from '@/utils/cn';

export default function Progress({ value = 0, showLabel = false, size = 'md', color, className }) {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-700">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-200/50", sizes[size])}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedValue}%`,
            backgroundColor: color || '#2563eb',
          }}
        />
      </div>
    </div>
  );
}

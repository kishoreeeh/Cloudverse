import { cn } from '@/utils/cn';

export default function Card({ className, children, hoverable = false, padding = 'default', ...props }) {
  const paddings = {
    none: '',
    sm: 'p-3 sm:p-4',
    default: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-doc transition-all duration-200 overflow-hidden",
        hoverable && "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-doc-hover",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

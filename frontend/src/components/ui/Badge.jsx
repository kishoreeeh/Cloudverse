import { cn } from '@/utils/cn';

export default function Badge({ className, variant = 'default', children, customColor }) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    success: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    info: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    custom: 'border-transparent text-white',
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border tracking-tight",
        variants[variant],
        className
      )}
      style={variant === 'custom' ? { backgroundColor: customColor } : {}}
    >
      {children}
    </span>
  );
}

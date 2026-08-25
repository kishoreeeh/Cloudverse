import * as Icons from 'lucide-react';
import { cn } from '@/utils/cn';

export default function PageHeader({ title, description, icon, color }) {
  const Icon = Icons[icon] || Icons.Box;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div 
            className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs"
            style={{ color: color || '#3b82f6' }}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-slate-600 max-w-2xl text-base ml-12">
          {description}
        </p>
      )}
    </div>
  );
}

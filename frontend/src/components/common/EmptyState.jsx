import * as Icons from 'lucide-react';

export default function EmptyState({ icon = 'Inbox', title, description, action }) {
  const Icon = Icons[icon] || Icons.Inbox;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-slate-200/80 rounded-2xl border-dashed shadow-2xs">
      <div className="w-12 h-12 mb-4 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200/60">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 font-medium">{description}</p>
      {action}
    </div>
  );
}

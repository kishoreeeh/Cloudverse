import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-xs z-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
    </div>
  );
}

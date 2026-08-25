import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-9xl font-black text-slate-200 select-none mb-4">404</div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-8 max-w-md text-sm font-medium">
        The documentation page or topic you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button icon={Home}>Return to Home</Button>
      </Link>
    </div>
  );
}

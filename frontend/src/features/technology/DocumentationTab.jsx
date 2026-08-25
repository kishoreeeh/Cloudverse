import Card from '@/components/ui/Card';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function DocumentationTab({ url, color }) {
  if (!url) return null;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card hoverable className="text-center p-12 flex flex-col items-center group">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <BookOpen className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-3">Official Documentation</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          Access the most up-to-date and comprehensive guide directly from the creators.
        </p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            boxShadow: `0 10px 25px -5px ${color}50`
          }}
        >
          <span>Visit Documentation</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </Card>
    </div>
  );
}

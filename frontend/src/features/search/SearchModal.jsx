import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Layers, ArrowRight } from 'lucide-react';
import useSearchStore from '@/store/useSearchStore';
import { technologies } from '@/config/technologies';
import { technologiesData, popularTopics } from '@/data/topicsData';

export default function SearchModal() {
  const { isOpen, query, setQuery, closeSearch } = useSearchStore();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        useSearchStore.getState().openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSearch]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Compute search results dynamically from local datasets
  const searchResults = (() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const techMatches = technologies
      .filter(t => t.title.toLowerCase().includes(q) || t.fullName.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      .map(t => ({
        type: 'technology',
        title: t.title,
        subtitle: t.fullName,
        slug: t.slug,
        color: t.color,
      }));

    const topicMatches = [];
    Object.values(technologiesData).forEach(tech => {
      tech.topics.forEach(topic => {
        if (
          topic.title.toLowerCase().includes(q) ||
          topic.slug.toLowerCase().includes(q) ||
          topic.summary.toLowerCase().includes(q) ||
          topic.category.toLowerCase().includes(q)
        ) {
          topicMatches.push({
            type: 'topic',
            title: topic.title,
            subtitle: `${tech.title} • ${topic.category}`,
            techSlug: tech.slug,
            topicSlug: topic.slug,
            color: tech.color,
          });
        }
      });
    });

    return [...techMatches, ...topicMatches];
  })();

  const handleSelect = (item) => {
    if (item.type === 'technology') {
      navigate(`/technology/${item.slug}`);
    } else if (item.type === 'topic') {
      navigate(`/technology/${item.techSlug}?topic=${item.topicSlug}`);
    }
    closeSearch();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-modal overflow-hidden flex flex-col max-h-[80vh]"
        >
          <div className="flex items-center px-4 py-3 border-b border-slate-200 bg-slate-50/60">
            <Search className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics (e.g. EC2, IAM, Dockerfile, Pods, VPC)..."
              className="flex-1 bg-transparent border-none text-slate-900 px-3 text-base focus:outline-none focus:ring-0 placeholder:text-slate-400 font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 rounded-md mr-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={closeSearch} className="px-2 py-1 text-xs font-bold text-slate-500 bg-slate-200/80 hover:bg-slate-300 rounded-md transition-colors">
              ESC
            </button>
          </div>

          <div className="overflow-y-auto p-3 max-h-[60vh]">
            {!query.trim() ? (
              <div className="p-4 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Popular Quick Access Topics</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularTopics.map((pt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(`/technology/${pt.techSlug}?topic=${pt.topicSlug}`);
                        closeSearch();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pt.color }} />
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{pt.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">No matching topics found for "{query}"</p>
                <p className="text-xs">Try searching for EC2, S3, Dockerfile, Pods, IAM, VPC, or Linux commands.</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {searchResults.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-100/80 transition-colors text-left group border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                          {item.type === 'technology' ? <Layers className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</div>
                          <div className="text-xs text-slate-500 font-medium">{item.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white text-slate-600 border-slate-200">
                        {item.type}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

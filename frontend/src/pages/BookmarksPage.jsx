import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { Bookmark, BookmarkCheck, Trash2, Search, ExternalLink, BookOpen, HelpCircle, Video, ArrowRight, Sparkles } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import EmptyState from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarkStore();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = bookmarks.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = searchQuery === '' || 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techSlug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'topic':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'question':
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-red-500" />;
      default:
        return <Bookmark className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'topic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'question':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'video':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader
        title="Saved & Bookmarks"
        description="Access your bookmarked topics, interview questions, and video tutorials in one place."
        icon={Bookmark}
        badge={`${bookmarks.length} Saved Items`}
      >
        {bookmarks.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all bookmarks?')) {
                clearAllBookmarks();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </PageHeader>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'topic', label: 'Topics' },
            { id: 'question', label: 'Questions' },
            { id: 'video', label: 'Videos' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                filterType === tab.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookmarks.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border", getTypeBadgeClass(item.type))}>
                      {getTypeIcon(item.type)}
                      {item.type.toUpperCase()}
                    </span>
                    {item.techSlug && (
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.techSlug}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => removeBookmark(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Subtitle / Excerpt */}
                {item.subtitle && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Action Link Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Saved {new Date(item.timestamp).toLocaleDateString()}
                </span>

                {item.type === 'video' && item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Watch Video <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : item.techSlug ? (
                  <Link
                    to={`/technology/${item.techSlug}`}
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View in {item.techSlug.toUpperCase()} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title={bookmarks.length === 0 ? "No saved items yet" : "No matching bookmarks"}
          description={
            bookmarks.length === 0
              ? "Start saving topics, interview questions, or tutorial videos by clicking the bookmark icon on any item."
              : "Try adjusting your search query or filter settings."
          }
        />
      )}
    </div>
  );
}

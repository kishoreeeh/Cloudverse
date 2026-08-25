import { NavLink, useLocation } from 'react-router-dom';
import { technologies } from '@/config/technologies';
import { ExternalLink, BookOpen, Layers, Sparkles, Award, Bookmark, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const { bookmarks } = useBookmarkStore();
  const location = useLocation();
  const isTechPage = location.pathname.startsWith('/technology/');
  const currentSlug = isTechPage ? location.pathname.split('/')[2] : null;
  const currentTech = technologies.find(t => t.slug === currentSlug);
  const portalUrl = currentTech?.officialDocUrl || 'https://docs.aws.amazon.com/';
  const portalTitle = currentTech ? `${currentTech.title} Docs Portal` : 'Official Docs Portal';

  return (
    <aside className="fixed left-0 top-[104px] bottom-0 w-64 bg-white border-r border-slate-200/80 overflow-y-auto hidden md:flex flex-col z-30 shadow-2xs">
      <div className="px-4 py-5 flex-1 space-y-6">
        {!isTechPage && (
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
              <span>Core Technologies</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <nav className="space-y-1">
              {technologies.map((tech) => {
                const Icon = Icons[tech.icon] || Icons.Code;
                
                return (
                  <NavLink
                    key={tech.slug}
                    to={`/technology/${tech.slug}`}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 group text-sm",
                      isActive 
                        ? "text-slate-950 font-extrabold" 
                        : "text-slate-600 font-medium hover:bg-slate-50/60 hover:text-slate-900"
                    )}
                  >
                    <div 
                      className="p-1.5 rounded-lg transition-transform group-hover:scale-105 flex items-center justify-center"
                      style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 truncate">{tech.title}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Personal & Practice
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/quizzes"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm",
                isActive 
                  ? "text-blue-600 font-extrabold" 
                  : "text-slate-600 font-medium hover:bg-slate-50/60 hover:text-slate-900"
              )}
            >
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                <Award className="w-4 h-4" />
              </div>
              <span className="flex-1">Practice Quizzes</span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">Exams</span>
            </NavLink>

            <NavLink
              to="/bookmarks"
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm",
                isActive 
                  ? "text-amber-600 font-extrabold" 
                  : "text-slate-600 font-medium hover:bg-slate-50/60 hover:text-slate-900"
              )}
            >
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="flex-1">Saved Bookmarks</span>
              {bookmarks.length > 0 && (
                <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  {bookmarks.length}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 space-y-2">
        {isTechPage && (
          <NavLink
            to="/"
            className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs transition-all group"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </div>
          </NavLink>
        )}
        <a 
          href={portalUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg border border-slate-200/60 shadow-2xs transition-all"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>{portalTitle}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}

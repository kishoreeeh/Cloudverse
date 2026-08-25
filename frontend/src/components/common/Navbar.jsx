import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Award, Bookmark, Flame, Command, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import useSearchStore from '@/store/useSearchStore';
import { technologies } from '@/config/technologies';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { useStreakStore } from '@/store/useStreakStore';
import { useProgressStore } from '@/store/useProgressStore';
import DailyChallengeModal from '@/components/common/DailyChallengeModal';
import TechIcon, { CloudVerseLogo } from '@/components/common/TechLogos';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const { openSearch } = useSearchStore();
  const { bookmarks } = useBookmarkStore();
  const { streakCount, totalXp } = useStreakStore();
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  
  const getOverallStats = useProgressStore((state) => state.getOverallStats);
  const { overallPercent, completedCount, totalTopics } = getOverallStats(technologies);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-doc">
      {/* Announcement bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">NEW</span>
            <span>Kubernetes 1.30 & Terraform 1.8 Modules Updated with Interactive Labs</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Version v1.4.0 (Stable)</span>
            <span>•</span>
            <span>Official Docs Reference</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="w-full h-16 flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-doc flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="CloudVerse Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                CloudVerse
                <span className="text-[10px] font-mono tracking-wider font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">HUB</span>
              </span>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => cn(
                "px-3 py-1.5 rounded-md transition-colors",
                isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40" : "hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              Overview
            </NavLink>
            <NavLink
              to="/quizzes"
              className={({ isActive }) => cn(
                "px-3 py-1.5 rounded-md transition-colors",
                isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40" : "hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              Practice Exams
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) => cn(
                "px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5",
                isActive ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40" : "hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Notes</span>
              {bookmarks.length > 0 && (
                <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-1.5 py-0.2 rounded font-mono font-bold">
                  {bookmarks.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Center/Right Command Search & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={openSearch}
            className="flex items-center justify-between gap-3 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 rounded-md border border-slate-200/80 dark:border-slate-700 w-44 sm:w-64 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">Search topics & docs...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-slate-500 dark:text-slate-400 shadow-doc">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-600 dark:text-slate-300 font-semibold">{completedCount}/{totalTopics} Done</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {overallPercent}%
            </span>
          </div>

          <button
            onClick={() => setIsChallengeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 text-xs font-semibold transition-colors"
            title="Click for Daily Challenge"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{streakCount} Day Streak</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{totalXp} XP</span>
          </button>
        </div>
      </nav>

      {/* Sub-Header Technology Selector with Official Tool Logos */}
      <div className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1.5">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 mr-2 whitespace-nowrap">Technologies:</span>
          {technologies.map((tech) => (
            <NavLink
              key={tech.slug}
              to={`/technology/${tech.slug}`}
              className={({ isActive }) => cn(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-2 border",
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-doc"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <TechIcon slug={tech.slug} className="w-4 h-4" />
              <span>{tech.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <DailyChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
    </header>
  );
}

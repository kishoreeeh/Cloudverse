import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Award, Bookmark, Flame, Command, Terminal, Sparkles, CheckCircle2, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getOverallStats = useProgressStore((state) => state.getOverallStats);
  const { overallPercent, completedCount, totalTopics } = getOverallStats(technologies);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-doc">

      {/* Main Navigation Header */}
      <nav className="w-full h-16 flex items-center justify-between px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-doc flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img src="/logo.jpg" alt="CloudVerse Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                CloudVerse
              </span>
              <span className="text-[10px] font-mono tracking-wider font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                HUB
              </span>
            </div>
          </Link>

          {/* Quick Nav Links (Desktop) */}
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
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openSearch}
            className="flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 rounded-md border border-slate-200/80 dark:border-slate-700 w-auto sm:w-48 lg:w-64 transition-colors text-left"
            title="Search topics & docs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="hidden sm:inline truncate">Search topics...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-slate-500 dark:text-slate-400 shadow-doc">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-600 dark:text-slate-300 font-semibold">{completedCount}/{totalTopics} Done</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {overallPercent}%
            </span>
          </div>

          <button
            onClick={() => setIsChallengeOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 text-xs font-semibold transition-colors shrink-0"
            title="Click for Daily Challenge"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="hidden sm:inline">{streakCount} Day Streak</span>
            <span className="sm:hidden font-bold">{streakCount}d</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{totalXp} XP</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800 font-semibold text-sm">
            <NavLink
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg transition-colors flex items-center justify-between",
                isActive ? "text-blue-600 bg-blue-50 dark:bg-blue-950/40" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <span>Overview</span>
              <span className="text-xs text-slate-400">Dashboard</span>
            </NavLink>
            <NavLink
              to="/quizzes"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg transition-colors flex items-center justify-between",
                isActive ? "text-blue-600 bg-blue-50 dark:bg-blue-950/40" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <span>Practice Exams</span>
              <Award className="w-4 h-4 text-amber-500" />
            </NavLink>
            <NavLink
              to="/bookmarks"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg transition-colors flex items-center justify-between",
                isActive ? "text-blue-600 bg-blue-50 dark:bg-blue-950/40" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Saved Notes</span>
              </div>
              {bookmarks.length > 0 && (
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                  {bookmarks.length}
                </span>
              )}
            </NavLink>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Course Progress:</span>
            <span className="font-bold text-emerald-600">{completedCount}/{totalTopics} Topics ({overallPercent}%)</span>
          </div>
        </div>
      )}

      {/* Sub-Header Technology Selector with Official Tool Logos */}
      <div className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 mr-1 whitespace-nowrap shrink-0">Tech:</span>
          {technologies.map((tech) => (
            <NavLink
              key={tech.slug}
              to={`/technology/${tech.slug}`}
              className={({ isActive }) => cn(
                "px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 sm:gap-2 border shrink-0",
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-doc"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <TechIcon slug={tech.slug} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{tech.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <DailyChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
    </header>
  );
}


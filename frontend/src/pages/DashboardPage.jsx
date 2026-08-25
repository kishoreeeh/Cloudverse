import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { technologies } from '@/config/technologies';
import { technologiesData } from '@/data/topicsData';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TerminalSimulator from '@/components/common/TerminalSimulator';
import DailyChallengeModal from '@/components/common/DailyChallengeModal';
import ArchitectureVisualizer from '@/components/common/ArchitectureVisualizer';
import TechIcon from '@/components/common/TechLogos';
import { useStreakStore } from '@/store/useStreakStore';
import { ArrowRight, Search, Terminal, Layers, Zap } from 'lucide-react';
import useSearchStore from '@/store/useSearchStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { cn } from '@/utils/cn';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { openSearch } = useSearchStore();
  const { getTechCompletedCount, getTechProgress, getOverallStats } = useProgressStore();
  const { bookmarks } = useBookmarkStore();
  const { streakCount, totalXp } = useStreakStore();

  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [activeTool, setActiveTool] = useState('architecture'); // 'architecture' | 'terminal'

  const overallStats = getOverallStats(technologies);

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Formal Documentation Header Section */}
      <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-doc space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
              <span>CLOUDVERSE PLATFORM</span>
              <span>/</span>
              <span className="text-slate-500">DEVOPS & CLOUD INFRASTRUCTURE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              DevOps & Infrastructure Learning Hub
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Curated documentation, architecture patterns, hands-on CLI commands, interview Q&A, and practice assessments for AWS, Docker, Kubernetes, Linux, Git, and Terraform.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsChallengeOpen(true)}
              variant="accent"
              icon={Zap}
            >
              Daily Quiz (+50 XP)
            </Button>
            <Button
              onClick={openSearch}
              variant="outline"
              icon={Search}
            >
              Quick Search (⌘K)
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded font-mono font-bold">
              01
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">TOPICS MASTERED</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {overallStats.totalCompletedCount} / {overallStats.totalTopicsCount}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded font-mono font-bold">
              02
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">OVERALL PROGRESS</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {overallStats.overallPercent}%
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded font-mono font-bold">
              03
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">SAVED NOTES</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                {bookmarks.length} Bookmarks
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-mono font-bold">
              04
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">TOTAL XP EARNED</div>
              <div className="text-sm font-bold text-purple-700 dark:text-purple-300 font-mono">
                {totalXp} XP
              </div>
            </div>
          </div>
        </div>
      </section>

      <DailyChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />

      {/* Core Technologies Grid with Official Brand Logomarks */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Technology Modules & Documentation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Structured learning tracks with official vector documentation references, personal notes, interview questions, and quizzes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => {
            const techData = technologiesData[tech.slug] || {};
            const topicCount = techData.topics?.length || 10;
            const completedCount = getTechCompletedCount(tech.slug);
            const progressPct = getTechProgress(tech.slug, topicCount);
            
            return (
              <div 
                key={tech.slug}
                onClick={() => navigate(`/technology/${tech.slug}`)}
                className="cursor-pointer group"
              >
                <Card 
                  hoverable 
                  className="h-full flex flex-col justify-between border border-slate-200 dark:border-slate-800 p-6 rounded-lg relative transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-3 rounded-lg text-white font-bold flex items-center justify-center shadow-doc shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: tech.color }}
                        >
                          <TechIcon slug={tech.slug} className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tech.title}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                            {tech.shortName} • {topicCount} Topics
                          </span>
                        </div>
                      </div>

                      <Badge variant="default" className="font-mono text-[11px]">
                        {completedCount}/{topicCount} Done
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  {/* Progress Bar & Footer Link */}
                  <div className="pt-6 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono font-medium text-slate-500">
                        <span>Track Progress</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ backgroundColor: tech.color, width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-400 font-mono text-[11px]">Official Reference</span>
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                        Open Track <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Suite Section */}
      <section className="bg-white dark:bg-slate-900 rounded-lg p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-doc space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
              <Terminal className="w-4 h-4" />
              <span>HANDS-ON SIMULATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Interactive Engineering Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Explore real-time infrastructure architecture diagrams and practice command line tools.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTool('architecture')}
              className={cn(
                "px-3.5 py-2 rounded text-xs font-semibold transition-all flex items-center gap-2",
                activeTool === 'architecture'
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-doc"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Architecture Visualizer</span>
            </button>

            <button
              onClick={() => setActiveTool('terminal')}
              className={cn(
                "px-3.5 py-2 rounded text-xs font-semibold transition-all flex items-center gap-2",
                activeTool === 'terminal'
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-doc"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>CLI Terminal Sandbox</span>
            </button>
          </div>
        </div>

        {activeTool === 'architecture' ? (
          <ArchitectureVisualizer initialType="aws" />
        ) : (
          <TerminalSimulator defaultCategory="linux" />
        )}
      </section>
    </div>
  );
}

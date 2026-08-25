import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { technologies } from '@/config/technologies';
import { technologiesData } from '@/data/topicsData';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck,
  Briefcase,
  Cpu,
  FileCode,
  ListOrdered,
  Award,
  Copy,
  Check,
  Video,
  Bookmark,
  BookmarkCheck,
  Circle
} from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import LearningPathTab from '@/features/technology/LearningPathTab';
import InterviewQuestionsTab from '@/features/technology/InterviewQuestionsTab';
import VideosTab from '@/features/technology/VideosTab';
import QuizTab from '@/features/technology/QuizTab';
import NotesTab from '@/features/technology/NotesTab';
import TerminalTab from '@/features/technology/TerminalTab';
import ArchitectureTab from '@/features/technology/ArchitectureTab';
import ProjectsTab from '@/features/technology/ProjectsTab';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';

import TechIcon from '@/components/common/TechLogos';

export default function TechnologyPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { getTechCompletedCount, getTechProgress, isTopicCompleted, toggleTopicCompleted } = useProgressStore();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  const tech = technologies.find(t => t.slug === slug);
  const techData = technologiesData[slug] || {
    id: slug,
    slug: slug,
    title: tech?.title || slug,
    shortName: tech?.title || slug,
    description: tech?.description || '',
    icon: tech?.icon || 'Code',
    color: tech?.color || '#2563eb',
    officialDocUrl: tech?.officialDocUrl || 'https://docs.aws.amazon.com/',
    topics: []
  };

  const topicsList = techData.topics || [];
  const completedCount = getTechCompletedCount(slug);
  const techProgress = getTechProgress(slug, topicsList.length);
  const topicParam = searchParams.get('topic');
  const activeFeatureTab = searchParams.get('tab') || 'docs';

  // Active selected topic
  const currentTopicIndex = Math.max(
    0,
    topicsList.findIndex(t => t.slug === topicParam)
  );
  const activeTopic = topicsList[currentTopicIndex] || topicsList[0];

  const [copiedCommand, setCopiedCommand] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Expandable interview Q&A state
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState(null);

  // Accordion curriculum modules state (default open Part 1 on first visit)
  const [openModules, setOpenModules] = useState({ 'mod-1': true });

  const getCurriculumModules = (topics, techSlug) => {
    if (!topics || topics.length === 0) return [];
    if (techSlug === 'aws' || topics.length >= 9) {
      const tier1 = Math.min(4, Math.ceil(topics.length / 3));
      const tier2 = Math.min(8, Math.ceil((topics.length * 2) / 3));
      return [
        { id: 'mod-1', title: 'Part 1: Cloud Foundations', subtitle: 'Essential building blocks', topics: topics.slice(0, tier1), indexOffset: 0 },
        { id: 'mod-2', title: 'Part 2: Core Infrastructure', subtitle: 'VPC, scaling & databases', topics: topics.slice(tier1, tier2), indexOffset: tier1 },
        { id: 'mod-3', title: 'Part 3: Advanced Architecture', subtitle: 'Serverless, K8s & monitoring', topics: topics.slice(tier2), indexOffset: tier2 }
      ];
    } else if (topics.length >= 4) {
      const mid = Math.ceil(topics.length / 2);
      return [
        { id: 'mod-1', title: 'Part 1: Core Essentials', subtitle: 'Architecture & CLI basics', topics: topics.slice(0, mid), indexOffset: 0 },
        { id: 'mod-2', title: 'Part 2: Advanced Operations', subtitle: 'Workflows & production setups', topics: topics.slice(mid), indexOffset: mid }
      ];
    } else {
      return [
        { id: 'mod-1', title: 'Part 1: Core Fundamentals', subtitle: 'Essential syntax & workflows', topics: topics.slice(0, 1), indexOffset: 0 },
        { id: 'mod-2', title: 'Part 2: Production Workflows', subtitle: 'Advanced techniques & mastery', topics: topics.slice(1), indexOffset: 1 }
      ];
    }
  };

  const curriculumModules = getCurriculumModules(topicsList, slug);

  // Reset to Foundation (mod-1) open on tech change
  useEffect(() => {
    setOpenModules({ 'mod-1': true });
  }, [slug]);

  // Auto-expand module containing the active topic if closed
  useEffect(() => {
    if (!activeTopic) return;
    const mod = curriculumModules.find(m => m.topics.some(t => t.id === activeTopic.id));
    if (mod && !openModules[mod.id]) {
      setOpenModules(prev => ({ ...prev, [mod.id]: true }));
    }
  }, [activeTopic?.id, slug]);

  const toggleModule = (modId) => {
    setOpenModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  useEffect(() => {
    // Reset quiz state when topic changes
    setQuizAnswers({});
    setQuizSubmitted(false);
    setExpandedInterviewIdx(null);
  }, [activeTopic?.id]);

  if (!tech) return <Navigate to="/404" replace />;

  const handleTopicSelect = (topicSlug) => {
    searchParams.set('topic', topicSlug);
    setSearchParams(searchParams);
  };

  const handleTabSelect = (tabId) => {
    searchParams.set('tab', tabId);
    setSearchParams(searchParams);
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < topicsList.length - 1) {
      const nextTopic = topicsList[currentTopicIndex + 1];
      searchParams.set('topic', nextTopic.slug);
      setSearchParams(searchParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevTopic = () => {
    if (currentTopicIndex > 0) {
      const prevTopic = topicsList[currentTopicIndex - 1];
      searchParams.set('topic', prevTopic.slug);
      setSearchParams(searchParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyCommands = (cmdText) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedCommand(true);
    toast.success('Commands copied to clipboard!');
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const handleQuizSelect = (qIdx, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    const quizCount = activeTopic?.quiz?.length || 0;
    if (Object.keys(quizAnswers).length < quizCount) {
      toast.error('Please answer all quiz questions before submitting.');
      return;
    }
    setQuizSubmitted(true);
    toast.success('Quiz submitted! Check your score below.');
  };

  const handleQuizReset = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const youtubeDirectUrl = activeTopic?.youtubeEmbedId 
    ? `https://www.youtube.com/watch?v=${activeTopic.youtubeEmbedId}` 
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(tech.title + ' ' + (activeTopic?.title || 'tutorial'))}`;

  const activeTopicCompleted = activeTopic ? isTopicCompleted(slug, activeTopic.id) : false;
  const bookmarkId = activeTopic ? `topic-${slug}-${activeTopic.id}` : '';
  const activeTopicBookmarked = activeTopic ? isBookmarked(bookmarkId) : false;

  return (
    <div className="pb-16 space-y-6">
      {/* Back to Overview */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-800 shadow-doc"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Technologies</span>
        </button>
      </div>

      {/* Formal Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-doc space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">TRACK DOCUMENTATION</span>
              <span className="text-slate-300">•</span>
              <Badge variant="default" className="font-mono text-[11px]">
                {topicsList.length} Topics
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <span className="p-2.5 rounded-lg text-white font-bold shadow-doc shrink-0" style={{ backgroundColor: tech.color }}>
                <TechIcon slug={slug} className="w-7 h-7" />
              </span>
              <span>{tech.title} Learning & Reference Guide</span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
              {tech.description}
            </p>

            {/* Progress bar */}
            <div className="pt-2 flex items-center gap-3 max-w-md">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${techProgress}%`,
                    backgroundColor: tech.color === '#000000' || tech.color === '#181717' ? '#2563eb' : tech.color 
                  }}
                />
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {completedCount}/{topicsList.length} Completed ({techProgress}%)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              onClick={() => navigate(`/quizzes/${tech.slug}`)}
              variant="accent"
              icon={Award}
            >
              Practice Exam
            </Button>
            <a
              href={activeTopic?.docUrl || tech?.officialDocUrl || techData?.officialDocUrl || 'https://docs.aws.amazon.com/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-700 shadow-doc transition-colors"
            >
              <span>Official Reference</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Documentation Segmented Tab Switcher */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-doc flex items-center gap-1 overflow-x-auto no-scrollbar sticky top-16 z-30">
        {[
          { id: 'docs', label: 'Documentation & Guide', icon: BookOpen },
          { id: 'path', label: 'Learning Path', icon: ListOrdered },
          { id: 'architecture', label: 'Architecture', icon: Layers },
          { id: 'interview', label: 'Interview Q&A', icon: HelpCircle },
          { id: 'videos', label: 'Video Tutorials', icon: Video },
          { id: 'quiz', label: 'Topic Quizzes', icon: Award },
          { id: 'notes', label: 'Personal Notes', icon: FileCode },
          { id: 'cli', label: 'CLI Sandbox', icon: Terminal },
          { id: 'projects', label: 'Projects', icon: Briefcase }
        ].map((tab) => {
          const isTabActive = activeFeatureTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              className={cn(
                "px-3.5 py-2 rounded-md font-semibold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-colors",
                isTabActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-doc"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", isTabActive ? "text-blue-400 dark:text-blue-600" : "text-slate-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Specific Page Views */}
      {activeFeatureTab === 'path' && (
        <LearningPathTab topics={topicsList} techSlug={slug} />
      )}

      {activeFeatureTab === 'interview' && (
        <InterviewQuestionsTab topics={topicsList} techSlug={slug} />
      )}

      {activeFeatureTab === 'videos' && (
        <VideosTab topics={topicsList} techSlug={slug} />
      )}

      {activeFeatureTab === 'quiz' && (
        <QuizTab topics={topicsList} />
      )}

      {activeFeatureTab === 'notes' && (
        <NotesTab topics={topicsList} />
      )}

      {activeFeatureTab === 'cli' && (
        <TerminalTab techSlug={slug} />
      )}

      {activeFeatureTab === 'architecture' && (
        <ArchitectureTab techSlug={slug} />
      )}

      {activeFeatureTab === 'projects' && (
        <ProjectsTab techSlug={slug} techProgress={techProgress} />
      )}

      {activeFeatureTab === 'docs' && (
        /* Modern Professional Documentation Page View */
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Topics Navigation List (Spacious & Professional) */}
          <aside className="w-full lg:w-80 xl:w-88 flex-shrink-0 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 sticky top-24">
            <div className="flex items-center justify-between px-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4" style={{ color: tech.color }} />
                <span>{tech.title} Curriculum</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {currentTopicIndex + 1} / {topicsList.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1">
              {curriculumModules.map((mod) => (
                <div key={mod.id} className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/40">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between p-3 bg-slate-100/80 hover:bg-slate-200/60 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 pr-1.5">
                      <Layers className="w-4 h-4 flex-shrink-0" style={{ color: tech.color }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 leading-snug break-words">{mod.title}</div>
                        <div className="text-[10px] font-medium text-slate-500 leading-tight mt-0.5 break-words">{mod.subtitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0 pl-1">
                      <span className="text-[10px] font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200/80 shadow-2xs">
                        {mod.topics.length}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${openModules[mod.id] ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openModules[mod.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-1.5 space-y-1 bg-white border-t border-slate-200/50">
                          {mod.topics.map((t, idx) => {
                            const actualIndex = mod.indexOffset + idx;
                            const isSelected = activeTopic?.id === t.id;
                            const isCompleted = isTopicCompleted(slug, t.id);

                            return (
                              <button
                                key={t.id}
                                onClick={() => handleTopicSelect(t.slug)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all text-left ${
                                  isSelected
                                    ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs'
                                    : isCompleted
                                    ? 'bg-emerald-50/50 text-emerald-900 font-medium hover:bg-emerald-50'
                                    : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                                }`}
                                style={isSelected ? { borderLeft: `3px solid ${tech.color}` } : { borderLeft: '3px solid transparent' }}
                              >
                                <div className="flex items-center gap-2.5 pr-2">
                                  <span 
                                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                                      isSelected 
                                        ? 'bg-slate-900 text-white shadow-2xs' 
                                        : isCompleted 
                                        ? 'bg-emerald-500 text-white shadow-2xs' 
                                        : 'bg-slate-100 text-slate-500'
                                    }`}
                                  >
                                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : actualIndex + 1}
                                  </span>
                                  <span className="leading-snug">{t.title}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content Area (Unified Clean Canvas) */}
          <main className="flex-1 w-full min-w-0">
            {activeTopic ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-sm space-y-10"
                >
                  {/* Topic Header Section */}
                  <div className="border-b border-slate-100 pb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
                        >
                          {activeTopic.category || tech.title}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">Topic {currentTopicIndex + 1} of {topicsList.length}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* Bookmark Button */}
                        <button
                          onClick={() =>
                            toggleBookmark({
                              id: bookmarkId,
                              techSlug: slug,
                              type: 'topic',
                              title: activeTopic.title,
                              subtitle: activeTopic.summary,
                              link: `/technology/${slug}?topic=${activeTopic.slug}`
                            })
                          }
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            activeTopicBookmarked
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-600'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          title={activeTopicBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                        >
                          {activeTopicBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        {/* Topic Completion Toggle Button */}
                        <button
                          onClick={() => toggleTopicCompleted(slug, activeTopic.id)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-2xs ${
                            activeTopicCompleted
                              ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                              : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                          }`}
                        >
                          {activeTopicCompleted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-4 h-4 text-white" />
                              <span>Mark as Completed</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                      {activeTopic.title}
                    </h1>

                    <p className="text-lg text-slate-600 font-normal leading-relaxed">
                      {activeTopic.summary}
                    </p>
                  </div>

                  {/* 1. What is it? */}
                  <div className="space-y-4 pt-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
                      <div className="w-2 h-6 rounded-full bg-blue-600" />
                      What is {activeTopic.title}?
                    </h2>
                    <div className="text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      {activeTopic.whatIsIt}
                    </div>
                  </div>

                  {/* 2. Why is it used? */}
                  <div className="space-y-4 border-t border-slate-100 pt-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
                      <div className="w-2 h-6 rounded-full bg-indigo-600" />
                      Why is it used?
                    </h2>
                    <p className="text-base text-slate-700 leading-relaxed font-normal">
                      {activeTopic.whyIsItUsed}
                    </p>
                  </div>

                  {/* 3. Key Features & 4. Advantages (Clean Two-Column Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                    {/* Features */}
                    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/60 space-y-4">
                      <div className="flex items-center gap-2.5 text-slate-900">
                        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold">Key Features</h3>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-700 font-medium">
                        {activeTopic.features?.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advantages */}
                    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/60 space-y-4">
                      <div className="flex items-center gap-2.5 text-slate-900">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                          <Award className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold">Key Advantages</h3>
                      </div>
                      <ul className="space-y-3 text-sm text-slate-700 font-medium">
                        {activeTopic.advantages?.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 5. Real-World Use Case (Sleek Callout Box) */}
                  <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/10 text-amber-400">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Real-World Industry Use Case</h3>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {activeTopic.useCase}
                    </p>
                  </div>

                  {/* 6. Working / Architecture Explanation */}
                  <div className="space-y-4 border-t border-slate-100 pt-8">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
                      <div className="w-2 h-6 rounded-full bg-purple-600" />
                      Working & Architecture
                    </h2>
                    <p className="text-base text-slate-700 leading-relaxed font-normal">
                      {activeTopic.workingExplanation}
                    </p>
                  </div>

                  {/* 7. Step-by-Step Usage Walkthrough */}
                  {activeTopic.usageSteps && (
                    <div className="space-y-6 border-t border-slate-100 pt-8">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
                        <div className="w-2 h-6 rounded-full bg-sky-600" />
                        Step-by-Step Usage Walkthrough
                      </h2>
                      <ol className="space-y-4">
                        {activeTopic.usageSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                              {idx + 1}
                            </span>
                            <span className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* 8. CLI Commands / Syntax Example */}
                  {activeTopic.commands && (
                    <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-md overflow-hidden border border-slate-800">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Terminal className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white">CLI Commands & Syntax</h3>
                            <p className="text-xs text-slate-400">Copy or execute in your terminal</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyCommands(activeTopic.commands)}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
                        >
                          {copiedCommand ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCommand ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>

                      <div className="p-6 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed">
                        <pre className="whitespace-pre-wrap">{activeTopic.commands}</pre>
                      </div>
                    </div>
                  )}

                  {/* 9. Best Practices */}
                  {activeTopic.bestPractices && (
                    <div className="space-y-6 border-t border-slate-100 pt-8">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
                        <div className="w-2 h-6 rounded-full bg-emerald-600" />
                        Best Practices & Production Guidelines
                      </h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeTopic.bestPractices.map((bp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Seamless Bottom Navigation Footer */}
                  <div className="flex items-center justify-between pt-10 border-t border-slate-200 mt-12">
                    <Button
                      variant="outline"
                      onClick={handlePrevTopic}
                      disabled={currentTopicIndex === 0}
                      className="font-bold text-slate-700 hover:bg-slate-50 px-5 py-3 rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" /> Previous Topic
                    </Button>

                    <Button
                      onClick={handleNextTopic}
                      disabled={currentTopicIndex === topicsList.length - 1}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-xs"
                    >
                      Next Topic <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
                Select a topic from the left menu to start learning.
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

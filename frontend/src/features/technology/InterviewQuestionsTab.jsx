import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bookmark, BookmarkCheck, Building2, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/common/EmptyState';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { cn } from '@/utils/cn';

export default function InterviewQuestionsTab({ topics = [], techSlug: propTechSlug }) {
  const params = useParams();
  const techSlug = propTechSlug || params.slug || 'aws';

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  useEffect(() => {
    if (topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  useEffect(() => {
    const loadTopic = () => {
      if (!selectedTopicId) return;
      setLoading(true);
      
      setTimeout(() => {
        const detail = topics.find(t => t.id === selectedTopicId);
        setTopicDetail(detail || null);
        setLoading(false);
      }, 50);
    };
    
    loadTopic();
    setExpandedId(null);
  }, [selectedTopicId, topics]);

  const questions = topicDetail?.interviewQuestions || [];

  const companies = ["Amazon", "Google", "Microsoft", "Uber", "Meta", "Netflix"];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="w-full md:w-60 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-doc sticky top-24">
        <h3 className="font-mono text-xs font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider">Select Topic</h3>
        <ul className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {topics.map(topic => (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopicId(topic.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-xs font-semibold transition-colors flex items-center justify-between",
                  selectedTopicId === topic.id
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold shadow-doc"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <span className="truncate">{topic.title}</span>
                <span className="text-[10px] opacity-75 font-mono">({topic.interviewQuestions?.length || 2})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 max-w-4xl space-y-4 w-full">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : questions.length === 0 ? (
          <EmptyState icon="MessageSquare" title="No questions available" description="Interview questions will be added to this topic soon." />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                {topicDetail?.title} — {questions.length} Questions
              </span>
              <span className="text-xs text-slate-500">Click question to reveal solution</span>
            </div>

            {questions.map((item, index) => {
              const isExpanded = expandedId === index;
              const bookmarkId = `q-${selectedTopicId}-${index}`;
              const bookmarked = isBookmarked(bookmarkId);
              const company = companies[index % companies.length];
              const difficulty = index % 3 === 0 ? "Easy" : index % 3 === 1 ? "Medium" : "Hard";

              return (
                <Card
                  key={index}
                  padding="none"
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <div className="p-4 sm:p-5 flex items-start gap-4">
                    <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200 dark:border-slate-700">
                      Q{index + 1}
                    </span>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="info" className="font-mono text-[10px]">
                          <Building2 className="w-3 h-3 mr-1 inline" /> {company}
                        </Badge>
                        <Badge 
                          variant={difficulty === "Easy" ? "success" : difficulty === "Medium" ? "warning" : "purple"} 
                          className="font-mono text-[10px]"
                        >
                          {difficulty}
                        </Badge>
                      </div>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : index)}
                        className="w-full text-left font-semibold text-slate-900 dark:text-white text-sm sm:text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between gap-3"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={cn("w-4 h-4 text-slate-400 transition-transform shrink-0", isExpanded && "rotate-180")}
                        />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark({
                          id: bookmarkId,
                          techSlug,
                          type: 'question',
                          title: item.question,
                          subtitle: item.answer,
                          link: `/technology/${techSlug}`
                        });
                      }}
                      className={cn(
                        "p-1.5 rounded border transition-colors shrink-0 text-xs",
                        bookmarked
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-600"
                      )}
                      title={bookmarked ? "Remove Bookmark" : "Bookmark Question"}
                    >
                      {bookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800"
                      >
                        <div className="p-4 sm:p-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Detailed Solution & Key Concepts:</span>
                          </div>
                          <p className="whitespace-pre-wrap pl-5 border-l-2 border-emerald-500">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Bookmark, BookmarkCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/common/EmptyState';
import { useProgressStore } from '@/store/useProgressStore';
import { useBookmarkStore } from '@/store/useBookmarkStore';
import { useParams } from 'react-router-dom';
import { cn } from '@/utils/cn';

export default function LearningPathTab({ topics = [], techSlug: propTechSlug }) {
  const params = useParams();
  const techSlug = propTechSlug || params.slug || 'aws';

  const { isTopicCompleted, toggleTopicCompleted } = useProgressStore();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  if (!topics || topics.length === 0) {
    return <EmptyState title="No learning path yet" description="A structured path is being created." icon="Map" />;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-8">
        {topics.map((topic, index) => {
          const completed = isTopicCompleted(techSlug, topic.id);
          const bookmarkId = `topic-${techSlug}-${topic.id}`;
          const bookmarked = isBookmarked(bookmarkId);

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-8 md:pl-10"
            >
              {/* Step indicator circle */}
              <div
                className={cn(
                  "absolute -left-[17px] top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shadow-xs",
                  completed
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : "bg-white border-blue-500 text-blue-600"
                )}
              >
                {completed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
              </div>

              <Card
                hoverable
                className={cn(
                  "p-5 transition-all",
                  completed && "border-emerald-500/40 bg-emerald-950/10"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={completed ? "success" : "default"}>Step {index + 1}</Badge>
                      {completed && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{topic.title}</h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Bookmark Button */}
                    <button
                      onClick={() =>
                        toggleBookmark({
                          id: bookmarkId,
                          techSlug,
                          type: 'topic',
                          title: topic.title,
                          subtitle: topic.description,
                          link: `/technology/${techSlug}`
                        })
                      }
                      className={cn(
                        "p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5",
                        bookmarked
                          ? "bg-amber-50 border-amber-200 text-amber-600"
                          : "bg-white border-slate-200 text-slate-500 hover:text-amber-500 hover:border-amber-300"
                      )}
                      title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    {/* Completion Toggle Button */}
                    <button
                      onClick={() => toggleTopicCompleted(techSlug, topic.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs",
                        completed
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                      )}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-blue-600" />
                          <span>Mark Complete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {topic.description || 'Learn the fundamentals and core concepts.'}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

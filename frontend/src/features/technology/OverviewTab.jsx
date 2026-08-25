import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import EmptyState from '@/components/common/EmptyState';
import { topicService } from '@/services/topicService';

export default function OverviewTab({ topics = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  useEffect(() => {
    const fetchTopic = async () => {
      if (!selectedTopicId) return;
      setLoading(true);
      try {
        const res = await topicService.getById(selectedTopicId);
        setTopicDetail(res.data);
      } catch (err) {
        console.error('Failed to load topic:', err);
        setTopicDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [selectedTopicId]);

  if (!topics || topics.length === 0) {
    return <EmptyState title="No content yet" description="Overview content is currently being built." icon="FileText" />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64 flex-shrink-0">
        <h3 className="font-semibold text-slate-500 mb-3 px-2 text-sm uppercase tracking-wider">Topics</h3>
        <ul className="space-y-1">
          {topics.map(topic => (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  selectedTopicId === topic.id
                    ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        key={selectedTopicId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm"
      >
        {loading ? (
          <div className="space-y-4">
            <div className="h-8 w-48 bg-slate-200/60 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200/60 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-200/60 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-200/60 rounded animate-pulse" />
          </div>
        ) : topicDetail ? (
          <div className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-li:text-slate-700 prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200">
            <h2 className="text-2xl font-bold mt-0 text-slate-900">{topicDetail.title}</h2>
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl border border-slate-200"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 text-sm border border-slate-200" {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {topicDetail.overview || 'No overview available yet.'}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-slate-500 italic">Select a topic to view its overview.</div>
        )}
      </motion.div>
    </div>
  );
}

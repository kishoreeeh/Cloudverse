import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import { topicService } from '@/services/topicService';

export default function FlashCardsTab({ topics = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
        setCurrentIndex(0);
        setIsFlipped(false);
      }, 100);
    };
    
    loadTopic();
  }, [selectedTopicId, topics]);

  const cards = topicDetail?.flashCards || [];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-56 flex-shrink-0">
        <h3 className="font-semibold text-slate-500 mb-3 px-2 text-sm uppercase tracking-wider">Topics</h3>
        <ul className="space-y-1">
          {topics.map(topic => (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedTopicId === topic.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {loading ? (
          <div className="w-full max-w-lg h-72 bg-slate-200/60 rounded-2xl animate-pulse" />
        ) : cards.length === 0 ? (
          <EmptyState icon="Layers" title="No flash cards" description="Flash cards will be added soon for this topic." />
        ) : (
          <>
            <div
              className="w-full max-w-lg h-72 mb-8 cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 shadow-md"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="absolute top-4 right-4 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    Question
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-center text-slate-900 leading-relaxed">
                    {cards[currentIndex]?.front}
                  </h3>
                  <div className="absolute bottom-4 flex items-center gap-2 text-sm text-slate-400 group-hover:text-blue-500 transition-colors">
                    <RotateCcw className="w-4 h-4" /> Click to flip
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 shadow-md"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="absolute top-4 right-4 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Answer
                  </span>
                  <p className="text-lg text-center text-slate-700 leading-relaxed">
                    {cards[currentIndex]?.back}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" onClick={handlePrev} disabled={cards.length <= 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-slate-500 w-16 text-center tabular-nums">
                {currentIndex + 1} / {cards.length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleNext} disabled={cards.length <= 1}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

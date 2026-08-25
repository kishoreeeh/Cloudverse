import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/common/EmptyState';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, ChevronLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { quizService } from '@/services/quizService';

export default function QuizTab({ topics = [] }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (topics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(topics[0].id);
    }
  }, [topics, selectedTopicId]);

  useEffect(() => {
    const loadQuiz = () => {
      if (!selectedTopicId) return;
      setLoading(true);
      
      setTimeout(() => {
        const topicDetail = topics.find(t => t.id === selectedTopicId);
        
        if (topicDetail && topicDetail.quiz && topicDetail.quiz.length > 0) {
          const mappedQuiz = {
            id: topicDetail.id,
            title: topicDetail.title + ' Quiz',
            questions: topicDetail.quiz.map(q => ({
              text: q.question,
              options: q.options,
              correctAnswerIndex: q.answerIndex,
              explanation: q.explanation
            }))
          };
          setQuiz(mappedQuiz);
        } else {
          setQuiz(null);
        }
        
        setLoading(false);
        handleRestart(false);
      }, 300); // Slight delay for smooth UX transition
    };
    
    loadQuiz();
  }, [selectedTopicId, topics]);

  const handleSelect = (optionIndex) => {
    if (submitted) return;
    const currentQIdx = currentIndex;
    setSelectedAnswers(prev => ({ ...prev, [currentQIdx]: optionIndex }));

    if (quiz && currentQIdx < quiz.questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => (prev === currentQIdx ? currentQIdx + 1 : prev));
      }, 350);
    }
  };

  const handleNext = () => {
    if (quiz && currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      let score = 0;
      const questionResults = quiz.questions.map((q, i) => {
        const selected = selectedAnswers[i] ?? -1;
        const isCorrect = selected === q.correctAnswerIndex;
        if (isCorrect) score++;
        
        return {
          questionText: q.text,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswerIndex,
          isCorrect: isCorrect,
          explanation: q.explanation
        };
      });

      setResults({
        score,
        totalQuestions: quiz.questions.length,
        percentage: (score / quiz.questions.length) * 100,
        questionResults
      });
      
      setSubmitted(true);
      setSubmitting(false);
      toast.success('Quiz submitted!');
    }, 500); // Simulate network request delay for UX
  };

  const handleRestart = (resetTopic = true) => {
    setStarted(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setResults(null);
  };

  const questions = quiz?.questions || [];

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

      <div className="flex-1 max-w-2xl">
        {loading ? (
          <div className="space-y-4">
            <div className="h-48 bg-slate-200/60 rounded-xl animate-pulse" />
          </div>
        ) : !quiz || questions.length === 0 ? (
          <EmptyState icon="HelpCircle" title="No quiz available" description="Quiz questions will be added soon for this topic." />
        ) : !started ? (
          /* Pre-Start Screen */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{quiz.title}</h2>
            <p className="text-slate-600 mb-8 max-w-md">
              Test your knowledge with {questions.length} questions. Good luck!
            </p>
            <Button size="lg" onClick={() => setStarted(true)}>
              Start Quiz <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : submitted && results ? (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-4"
          >
            <Card className="text-center p-8 mb-8">
              <div
                className="text-7xl font-black mb-3"
                style={{
                  color: results.percentage >= 80 ? '#22c55e' : results.percentage >= 50 ? '#eab308' : '#ef4444',
                }}
              >
                {Math.round(results.percentage)}%
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {results.percentage >= 80 ? '🎉 Excellent!' : results.percentage >= 50 ? '👍 Good Try!' : '📚 Keep Learning'}
              </h3>
              <p className="text-slate-600 mb-6">
                You scored {results.score} out of {results.totalQuestions}
              </p>
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
              </Button>
            </Card>

            <div className="space-y-3">
              {results.questionResults?.map((qr, i) => (
                <Card
                  key={i}
                  className={`border ${
                    qr.correct
                      ? 'border-green-500/20 bg-green-500/5'
                      : 'border-red-500/20 bg-red-500/5'
                  }`}
                >
                  <div className="flex gap-3">
                    {qr.correct ? (
                      <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5 font-black stroke-[3]" />
                    )}
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-800">{qr.questionText}</h4>
                      <p className="text-sm text-slate-600">
                        Your answer:{' '}
                        <span className={qr.correct ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                          {questions[i]?.options?.[qr.selectedAnswer] ?? `Option ${qr.selectedAnswer + 1}`}
                        </span>
                      </p>
                      {!qr.correct && (
                        <p className="text-sm text-slate-600">
                          Correct answer:{' '}
                          <span className="text-green-600 font-medium">
                            {questions[i]?.options?.[qr.correctAnswer] ?? `Option ${qr.correctAnswer + 1}`}
                          </span>
                        </p>
                      )}
                      {qr.explanation && (
                        <p className="text-sm text-slate-500 italic mt-1">{qr.explanation}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Question Screen */
          <div className="py-4">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>{Object.keys(selectedAnswers).length} answered</span>
              </div>
              <Progress value={((currentIndex + 1) / questions.length) * 100} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="p-6 md:p-8 mb-6 bg-white border border-slate-200">
                  <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-6">
                    {questions[currentIndex]?.text}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentIndex]?.options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                          selectedAnswers[currentIndex] === idx
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              selectedAnswers[currentIndex] === idx
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </span>
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              {currentIndex === questions.length - 1 ? (
                <Button onClick={handleSubmit} loading={submitting}>
                  Submit Quiz
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleNext}>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

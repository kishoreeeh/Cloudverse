import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizzesData } from '@/data/quizzesData';
import { technologies } from '@/config/technologies';
import { useProgressStore } from '@/store/useProgressStore';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Trophy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function QuizzesPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { saveQuizResult, getQuizResult, resetQuizResult } = useProgressStore();

  // Default active course
  const activeTechSlug = slug && quizzesData[slug] ? slug : 'aws';
  const quizData = quizzesData[activeTechSlug] || quizzesData['aws'];
  const techMeta = technologies.find(t => t.slug === activeTechSlug) || technologies[0];

  const questions = quizData.questions || [];

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Restore saved quiz results on load or tab change
  useEffect(() => {
    const saved = getQuizResult(activeTechSlug);
    if (saved) {
      setSelectedAnswers(saved.answers || {});
      setIsSubmitted(true);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
    }
  }, [activeTechSlug]);

  const handleSelectOption = (questionIdx, optionIdx) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));

    // Auto-advance smoothly to next question if available
    if (questionIdx < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => (prev === questionIdx ? questionIdx + 1 : prev));
      }, 350);
    }
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < questions.length) {
      toast.error(`Please answer all ${questions.length} questions before submitting (${answeredCount}/${questions.length} answered).`);
      return;
    }
    const score = questions.reduce((acc, q, idx) => acc + (selectedAnswers[idx] === q.answerIndex ? 1 : 0), 0);
    const pct = Math.round((score / (questions.length || 1)) * 100);

    saveQuizResult(activeTechSlug, score, questions.length, pct, selectedAnswers);
    setIsSubmitted(true);
    toast.success('Exam submitted & score saved! Review your breakdown below.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartQuiz = () => {
    resetQuizResult(activeTechSlug);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    toast.success('Quiz reset. Good luck on your new attempt!');
  };

  const savedResult = getQuizResult(activeTechSlug);
  const scoreCount = isSubmitted 
    ? (savedResult?.score ?? questions.reduce((acc, q, idx) => acc + (selectedAnswers[idx] === q.answerIndex ? 1 : 0), 0))
    : 0;
  const percentage = isSubmitted 
    ? (savedResult?.percentage ?? Math.round((scoreCount / (questions.length || 1)) * 100))
    : 0;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="pb-16 space-y-8">
      {/* Header Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border shadow-sm relative overflow-hidden"
        style={{ backgroundColor: `${techMeta.color}08`, borderColor: `${techMeta.color}30` }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="custom" customColor={techMeta.color} className="text-white font-bold">
                Certification & Practice Exam Center
              </Badge>
              <span className="text-xs font-bold text-slate-500">
                {questions.length} Practice Questions
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {quizData.title}
            </h1>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              {quizData.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-500" />
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Exam Score</div>
                <div className="text-lg font-black text-slate-900">
                  {isSubmitted ? `${percentage}%` : `${answeredCount}/${questions.length} Solved`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {technologies.map(t => {
          const isActive = t.slug === activeTechSlug;
          const techQuizSaved = getQuizResult(t.slug);

          return (
            <button
              key={t.slug}
              onClick={() => navigate(`/quizzes/${t.slug}`)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: t.color }} 
              />
              <span>{t.title} Quiz</span>
              {techQuizSaved && (
                <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                  {techQuizSaved.percentage}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Exam Main Area */}
      {isSubmitted ? (
        /* Results Breakdown View */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Card className="p-8 bg-white border-slate-200 text-center space-y-4 shadow-sm">
            <div className="inline-flex p-4 rounded-full bg-slate-50 border border-slate-200">
              <Trophy 
                className="w-12 h-12" 
                style={{ color: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444' }} 
              />
            </div>
            
            <div>
              <div 
                className="text-5xl font-black mb-1"
                style={{ color: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444' }}
              >
                {percentage}%
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {percentage >= 80 ? '🎉 Excellent Mastered Score!' : percentage >= 60 ? '👍 Good Effort! Review Explanations' : '📚 Needs Practice'}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-1">
                You correctly answered {scoreCount} out of {questions.length} questions on {techMeta.title}.
              </p>
              {savedResult && (
                <p className="text-xs text-slate-400 mt-1">
                  Saved automatically on {new Date(savedResult.timestamp).toLocaleString()}
                </p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={handleRestartQuiz}>
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Exam
              </Button>
              <Button onClick={() => navigate(`/technology/${activeTechSlug}`)}>
                Study {techMeta.title} Documentation <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Detailed Answer Key & Explanations
            </h3>

            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.answerIndex;

              return (
                <Card 
                  key={idx}
                  className={`p-6 border ${
                    isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                            Question {idx + 1} • {q.topic}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                            {q.question}
                          </h4>
                        </div>
                      </div>
                      <Badge variant={isCorrect ? 'success' : 'warning'}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>

                    <div className="pl-8 space-y-1.5 text-xs sm:text-sm">
                      <div className="text-slate-700">
                        Your Answer: <strong className={isCorrect ? 'text-emerald-700' : 'text-red-700'}>{q.options[userAns]}</strong>
                      </div>
                      {!isCorrect && (
                        <div className="text-slate-700">
                          Correct Answer: <strong className="text-emerald-700">{q.options[q.answerIndex]}</strong>
                        </div>
                      )}
                      <div className="mt-2 p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Explanation:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      ) : (
        /* Active Quiz Question View */
        <div className="space-y-6">
          {/* Question Navigator Pills */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-800">
                Question <strong className="text-blue-600 font-extrabold">{currentIndex + 1}</strong> of {questions.length}
              </span>
              <span className={`px-3 py-1 rounded-lg ${answeredCount === questions.length ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
                <strong className="font-extrabold">{answeredCount}</strong> / {questions.length} Solved & Answered
              </span>
            </div>

            <Progress value={(answeredCount / questions.length) * 100} color={techMeta.color} className="h-2.5" />

            {/* Interactive Question Step Buttons */}
            <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar pb-1">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                      isCurrent 
                        ? 'bg-slate-900 text-white shadow-md ring-2 ring-blue-500 ring-offset-2 scale-105' 
                        : isAnswered 
                        ? 'bg-emerald-500 text-white font-extrabold hover:bg-emerald-600' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isAnswered && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          {questions[currentIndex] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 sm:p-8 bg-white border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs"
                      style={{ backgroundColor: `${techMeta.color}15`, color: techMeta.color, borderColor: `${techMeta.color}30` }}
                    >
                      {questions[currentIndex].topic} • {questions[currentIndex].difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {questions[currentIndex].question}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentIndex] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(currentIndex, optIdx)}
                          className={`w-full p-4 rounded-xl text-xs sm:text-sm font-semibold text-left transition-all border flex items-center gap-3 ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/50'
                              : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <span 
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Exam Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" /> Previous Question
            </Button>

            {answeredCount === questions.length || currentIndex === questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz} className="shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Submit Practice Exam ({answeredCount}/{questions.length})
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              >
                Next Question <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Flame, Award, CheckCircle2, XCircle, Sparkles, X, ChevronRight } from 'lucide-react';
import { useStreakStore } from '@/store/useStreakStore';
import toast from 'react-hot-toast';

const DAILY_CHALLENGES = [
  {
    id: 'challenge_aws_vpc_1',
    title: 'AWS VPC Architecture Security Scenario',
    scenario: 'You are designing a high-security payment processing application on AWS. Which subnet configuration is best practice for hosting PostgreSQL database instances?',
    options: [
      'Public Subnet with Internet Gateway route',
      'Private Subnet with NAT Gateway route',
      'Isolated Private Subnet with NO internet route & Security Group restriction from App tier',
      'Public Subnet with Elastic IP attached'
    ],
    correctIdx: 2,
    explanation: 'Database clusters should be in isolated subnets without internet access, accepting traffic ONLY from application security groups.',
    xp: 50
  },
  {
    id: 'challenge_docker_1',
    title: 'Docker Image Optimization Challenge',
    scenario: 'Your production Docker image size is 1.2GB due to build SDKs. Which Dockerfile technique reduces image size down to 20MB?',
    options: [
      'Multi-Stage Build copying only build artifacts to Alpine base image',
      'Using docker commit on running container',
      'Adding EXPOSE 80 to Dockerfile',
      'Running apt-get update twice'
    ],
    correctIdx: 0,
    explanation: 'Multi-stage builds allow separating heavy build tools from the lightweight final runtime image.',
    xp: 50
  }
];

export default function DailyChallengeModal({ isOpen, onClose }) {
  const { streakCount, totalXp, completeDailyChallenge, completedChallenges } = useStreakStore();

  // Pick today's challenge
  const todayIdx = new Date().getDate() % DAILY_CHALLENGES.length;
  const currentChallenge = DAILY_CHALLENGES[todayIdx];
  const isAlreadyDone = completedChallenges.includes(currentChallenge.id);

  const [selectedOpt, setSelectedOpt] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setSubmitted(true);

    if (selectedOpt === currentChallenge.correctIdx) {
      completeDailyChallenge(currentChallenge.id, currentChallenge.xp);
      toast.success(`Correct! +${currentChallenge.xp} XP Earned! Streak Updated 🔥`);
    } else {
      toast.error('Incorrect. Review explanation below!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                Daily DevOps Scenario Challenge
              </h3>
              <p className="text-xs text-slate-400 font-medium">Earn +50 XP & Keep Your 🔥 {streakCount}-Day Streak Active!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 space-y-5">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              {currentChallenge.title}
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentChallenge.scenario}
            </p>
          </div>

          <div className="space-y-2.5">
            {currentChallenge.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentChallenge.correctIdx;

              let btnStyle = 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50';
              if (submitted) {
                if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                else if (isSelected) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-slate-900 text-white border-slate-900 font-extrabold shadow-sm';
              }

              return (
                <button
                  key={idx}
                  onClick={() => !submitted && setSelectedOpt(idx)}
                  disabled={submitted}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                  {submitted && isSelected && !isCorrect && <X className="w-5 h-5 text-rose-600 flex-shrink-0 font-black stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Explanation:
              </span>
              <p className="text-slate-300 leading-relaxed font-sans">{currentChallenge.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-slate-500">
              Reward: <span className="text-amber-600 font-extrabold">+50 XP</span>
            </span>

            {submitted || isAlreadyDone ? (
              <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Continue Learning ❯
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={selectedOpt === null}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-xs"
              >
                Submit Answer 🔥
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

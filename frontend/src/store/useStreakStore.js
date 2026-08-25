import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStreakStore = create(
  persist(
    (set, get) => ({
      streakCount: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalXp: 150,
      completedChallenges: [],
      badges: [
        { id: 'first_step', title: 'Cloud Explorer', icon: '☁️', desc: 'Started your cloud learning journey', unlocked: true },
        { id: 'streak_3', title: 'Streak Apprentice', icon: '🔥', desc: 'Maintained a 3-day learning streak', unlocked: false },
        { id: 'quiz_master', title: 'Quiz Master', icon: '🎯', desc: 'Scored 100% on a practice exam', unlocked: false },
        { id: 'aws_architect', title: 'AWS Guru', icon: '⚡', desc: 'Completed all AWS topics', unlocked: false },
        { id: 'docker_captain', title: 'Docker Captain', icon: '🐳', desc: 'Mastered Docker containerization', unlocked: false }
      ],

      recordActivity: () => {
        const today = new Date().toISOString().split('T')[0];
        const last = get().lastActiveDate;

        if (last === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        let newStreak = get().streakCount;

        if (last === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }

        let currentBadges = [...get().badges];
        if (newStreak >= 3) {
          currentBadges = currentBadges.map(b => b.id === 'streak_3' ? { ...b, unlocked: true } : b);
        }

        set({
          streakCount: newStreak,
          lastActiveDate: today,
          badges: currentBadges
        });
      },

      completeDailyChallenge: (challengeId, xpEarned = 50) => {
        const state = get();
        if (state.completedChallenges.includes(challengeId)) return false;

        const today = new Date().toISOString().split('T')[0];
        const newXp = state.totalXp + xpEarned;
        const newCompleted = [...state.completedChallenges, challengeId];

        set({
          totalXp: newXp,
          completedChallenges: newCompleted,
          lastActiveDate: today
        });

        get().recordActivity();
        return true;
      },

      unlockBadge: (badgeId) => {
        set(state => ({
          badges: state.badges.map(b => b.id === badgeId ? { ...b, unlocked: true } : b)
        }));
      }
    }),
    {
      name: 'cloudverse-streak-store'
    }
  )
);

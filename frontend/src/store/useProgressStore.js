import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set, get) => ({
      completedTopics: {}, // format: { "aws:aws-vpc": true, ... }
      quizResults: {}, // format: { "aws": { score: 8, total: 10, percentage: 80, answers: {...}, timestamp: 12345 } }

      toggleTopicCompleted: (techSlug, topicId) => {
        const key = `${techSlug}:${topicId}`;
        set((state) => {
          const nextState = { ...state.completedTopics };
          if (nextState[key]) {
            delete nextState[key];
          } else {
            nextState[key] = true;
          }
          return { completedTopics: nextState };
        });
      },

      isTopicCompleted: (techSlug, topicId) => {
        const key = `${techSlug}:${topicId}`;
        return Boolean(get().completedTopics[key]);
      },

      getTechCompletedCount: (techSlug) => {
        const completed = get().completedTopics;
        const prefix = `${techSlug}:`;
        return Object.keys(completed).filter((k) => k.startsWith(prefix) && completed[k]).length;
      },

      getTechProgress: (techSlug, totalTopics) => {
        if (!totalTopics || totalTopics === 0) return 0;
        const count = get().getTechCompletedCount(techSlug);
        return Math.min(100, Math.round((count / totalTopics) * 100));
      },

      saveQuizResult: (techSlug, score, total, percentage, answers) => {
        set((state) => ({
          quizResults: {
            ...state.quizResults,
            [techSlug]: {
              score,
              total,
              percentage,
              answers,
              timestamp: Date.now()
            }
          }
        }));
      },

      getQuizResult: (techSlug) => {
        return get().quizResults[techSlug] || null;
      },

      resetQuizResult: (techSlug) => {
        set((state) => {
          const next = { ...state.quizResults };
          delete next[techSlug];
          return { quizResults: next };
        });
      },

      getOverallStats: (technologies = []) => {
        let totalTopicsCount = 0;
        let totalCompletedCount = 0;

        technologies.forEach((tech) => {
          const topicCount = tech.topicsCount || (tech.topics ? tech.topics.length : 0);
          totalTopicsCount += topicCount;
          totalCompletedCount += get().getTechCompletedCount(tech.slug);
        });

        const overallPercent = totalTopicsCount > 0 
          ? Math.round((totalCompletedCount / totalTopicsCount) * 100) 
          : 0;

        return {
          totalTopicsCount,
          totalCompletedCount,
          overallPercent
        };
      },

      resetProgress: () => set({ completedTopics: {}, quizResults: {} })
    }),
    {
      name: 'cloudverse-user-progress'
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [], // array of { id, techSlug, techTitle, type, title, subtitle, link, timestamp }

      toggleBookmark: (item) => {
        set((state) => {
          const exists = state.bookmarks.some((b) => b.id === item.id);
          if (exists) {
            return { bookmarks: state.bookmarks.filter((b) => b.id !== item.id) };
          } else {
            return {
              bookmarks: [
                {
                  ...item,
                  timestamp: item.timestamp || Date.now()
                },
                ...state.bookmarks
              ]
            };
          }
        });
      },

      isBookmarked: (id) => {
        return get().bookmarks.some((b) => b.id === id);
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id)
        }));
      },

      clearAllBookmarks: () => set({ bookmarks: [] })
    }),
    {
      name: 'cloudverse-user-bookmarks'
    }
  )
);

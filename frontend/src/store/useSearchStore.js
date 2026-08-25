import { create } from 'zustand';

const useSearchStore = create((set) => ({
  isOpen: false,
  query: '',
  results: [],
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: [] }),
}));

export default useSearchStore;

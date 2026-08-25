import api from './api';

export const technologyService = {
  getAll: () => api.get('/technologies'),
  getBySlug: (slug) => api.get(`/technologies/${slug}`),
  getTopics: (slug) => api.get(`/technologies/${slug}/topics`),
};

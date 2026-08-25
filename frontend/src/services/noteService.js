import api from './api';

export const noteService = {
  getByTopic: (topicId) => api.get(`/notes?topicId=${topicId}`),
  save: (topicId, content) => api.post(`/notes`, { topicId, content }),
  delete: (id) => api.delete(`/notes/${id}`),
};

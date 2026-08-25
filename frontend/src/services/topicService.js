import api from './api';

export const topicService = {
  getById: (id) => api.get(`/topics/${id}`),
};

import api from './api';

export const quizService = {
  getByTopic: (topicId) => api.get(`/topics/${topicId}/quiz`),
  submit: (quizId, answers) => api.post('/quizzes/submit', { quizId, answers }),
};

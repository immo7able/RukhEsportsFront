import api from './api';

export const getNewsItem = (discipline) => api.get(`/news/${discipline}`);

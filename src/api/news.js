import api from './api';

export const getNewsItem = (discipline, id) => api.get(`/api/news/${discipline}/${id}`);

import api from './api';

export const getNewsItem = (discipline, id) => api.get(`news/${discipline}/${id}`);
export const getAllNews = (discipline) => api.get(`news/${discipline}`);

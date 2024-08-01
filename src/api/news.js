import api from './api';

export const getNewsItem = (discipline, id) => api.get(`news/${discipline}/${id}`);
export const getAllNews = (discipline) => api.get(`news/${discipline}`);
export const getNews = () => api.get(`news/`);

export const isLiked = (newsId) => api.get(`/news/${newsId}/likes`)
export const likeNewsItem = (newsId, liked) => {
    return api.post(`/news/${newsId}/like`, { liked });
  };
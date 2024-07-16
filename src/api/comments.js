import api from './api';

export const getComments = (id) => api.get(`/api/comments/${id}`);
export const addComment = (id, comment, parentId = null) => {
    const data = { ...comment, parent_comment_id: parentId };
    return api.post(`/api/comments/${id}`, data);
  };
  
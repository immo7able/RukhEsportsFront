import api from './api';

export const getComments = (id) => api.get(`comments/${id}`);
export const addComment = (id, comment, parentId = null) => {
    const data = { ...comment, parent_comment_id: parentId };
    console.log("Отправка данных на сервер:", data);
    return api.post(`comments/${id}`, data);
};

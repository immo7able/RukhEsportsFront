import api from './api';

export const getComments = (id) => {
    return api.get(`comments/${id}`)
  };
  
  export const addComment = (id, comment, parentId = null) => {
    const data = { ...comment, parent_comment_id: parentId };
    console.log("Отправка данных на сервер:", data);
    return api.post(`comments/${id}`, data)
      .then(response => {
        console.log('Добавленный комментарий:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Ошибка при добавлении комментария:', error);
        throw error;
      });
  };

export const deleteComment = (id) => api.delete(`comments/${id}`);

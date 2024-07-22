import api from './api';
export const getProfile = () => api.get('/profile');
export const updateEmail = (email) => api.put('/updateEmail', { email });
export const updatePassword = (password) => api.put('/updatePassword', { password });
export const updateNickname = (nickname) => api.put('/updateNickname', { nickname });
export const uploadProfileImage = (formData) => {
    return api.put('/updateProfileImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
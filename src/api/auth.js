import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    throw new Error('Ошибка при логине: ' + error.message);
  }
};

export const signUp = async (email, password, confirmPassword) => {
  try {
    const response = await api.post('/register', { email, password, confirmPassword});
    console.log(response.data.error);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    localStorage.setItem('token', response.data.token);
    return response;
  } catch (error) {
    throw new Error('Ошибка при регистрации: ' + error.message);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

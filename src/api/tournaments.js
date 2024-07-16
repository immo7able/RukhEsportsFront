import api from './api';

export const getTournament = (id) => api.get(`/api/tournaments/${id ? id : ''}`);

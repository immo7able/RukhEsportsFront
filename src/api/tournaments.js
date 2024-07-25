import api from './api';

export const getTournament = (id) => api.get(`/tournaments/${id ? id : ''}`);
export const getTournaments = () => api.get(`/tournaments/`);

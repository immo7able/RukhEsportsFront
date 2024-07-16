import api from './api';

export const getTeam = (discipline) => api.get(`/teams/${discipline}`);
export const getPlayer = (teamId) => api.get(`/teams/${teamId}/player`);

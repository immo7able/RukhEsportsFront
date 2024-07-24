import api from './api';

export const getTeam = (discipline) => api.get(`/teams/${discipline}`);
export const getTeams = () => api.get(`/teams/`);
export const getPlayer = () => api.get(`/players/`);

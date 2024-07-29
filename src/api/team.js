import api from './api';

export const getTeam = (discipline) => api.get(`/teams/${discipline}/rukh`);
export const getTeams = (discipline) => api.get(`/teams/${discipline}`);
export const getPlayer = () => api.get(`/players/`);

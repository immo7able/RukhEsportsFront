import api from './api';

export const getTeam = (discipline) => api.get(`/teams/${discipline}`);
export const getTeamRukh = (discipline) => api.get(`/teams/${discipline}/rukh`);
export const getTeams = () => api.get(`/teams/`);
export const getPlayer = () => api.get(`/players/`);

import api from './api';

export const getTournament = (discipline, id) => api.get(`/tournaments/${discipline}/${id ? id : ''}`);
export const getTournaments = () => api.get(`/tournaments/`);
export const getTournamentsByDiscipline = (discipline) => api.get(`/tournaments/${discipline}`);

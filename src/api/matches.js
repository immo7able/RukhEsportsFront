import api from './api';

export const getMatches = (tournamentId) => api.get(`matches/tournament/${tournamentId}`);
export const getMatch = (discipline, matchId) => api.get(`matches/${discipline}/${matchId}`);
export const getAllMatches = () => api.get(`matches/`);
export const getMatchesByDiscipline = (discipline) => api.get(`matches/${discipline}`);

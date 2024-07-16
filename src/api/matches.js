import api from './api';

export const getMatches = (tournamentId) => api.get(`/api/matches?tournamentId=${tournamentId}`);
export const getMatch = (matchId) => api.get(`/api/matches/${matchId}`);

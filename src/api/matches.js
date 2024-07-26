import api from './api';

export const getMatches = (tournamentId) => api.get(`matches?tournamentId=${tournamentId}`);
export const getMatch = (matchId) => api.get(`matches/${matchId}`);
export const getAllMatches = () => api.get(`matches/`);

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './components/Nav/NavBar';
import HomePage from './pages/HomePage';
import NewsPage from './pages/news/NewsPage';
import NewsDetail from './components/News/NewsDetail';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import Profile from './components/Auth/Profile';
import TournamentsPage from './pages/Tournaments/TournamentsPage';
import TournamentDetail from './components/Tournaments/TournamentDetail';
import MatchesPage from './pages/Matches/MatchesPage';
import MatchDetail from './components/Matches/MatchDetail';
import TeamPage from './pages/Team/TeamPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './admin/AdminPanel';

import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      console.log('Токен в localStorage:', token);
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    console.log('Обновление статуса авторизирован (isAuthenticated):', !!token);
  }, [isAuthenticated]);

  return (
      <Router>
        <NavBar isAuthenticated={isAuthenticated} />
        <Box mt={12}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/newspage/*" element={<NewsPage />} />
            <Route path="/newspage/:discipline/:id" element={<NewsDetail isAuthenticated={isAuthenticated} />} />
            <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route
                path="/profile"
                element={<ProtectedRoute element={Profile} isAuthenticated={isAuthenticated} />}
            />
            <Route path="/tournaments/*" element={<TournamentsPage />} />
            <Route path="/tournaments/:type/:id" element={<TournamentDetail />} />
            <Route path="/matches/*" element={<MatchesPage />} />
            <Route path="/matches/:type/:id" element={<MatchDetail />} />
            <Route path="/team/*" element={<TeamPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

          </Routes>
        </Box>
      </Router>
  );
};

export default App;
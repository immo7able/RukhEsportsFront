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
import { getProfile } from './api/profile'; 
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      // console.log('Токен в localStorage:', token);
      setIsAuthenticated(!!token);

      if (token) {
        try {
          const response = await getProfile();
          // console.log('Профиль пользователя:', response.data);
          if (response.data && response.data.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Ошибка при получении профиля:', error);
          setIsAdmin(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    // console.log('Статус авторизации (isAuthenticated):', isAuthenticated);
    // console.log('Статус администратора (isAdmin):', isAdmin);
  }, [isAuthenticated, isAdmin]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box className="loader">
          <Box className="half-ring"></Box>
        </Box>
      </Box>
    );
  }

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Box mt={12}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={AdminPanel}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                requiresAdmin={true}
              />
            }
          />
          <Route path="/newspage/*" element={<NewsPage />} />
          <Route path="/newspage/:discipline/:id" element={<NewsDetail isAuthenticated={isAuthenticated} />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isAuthenticated={isAuthenticated}
              />
            }
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

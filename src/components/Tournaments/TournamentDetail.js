import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon } from '@mui/icons-material';
import Footer from '../Footer';
import TournamentContent from './TournamentContent';
import MatchTabs from '../Matches/MatchTabs';
import MatchCard from '../Matches/MatchCard';
import { getMatches } from '../../api/matches';
import { getTournament } from '../../api/tournaments'; 

const TournamentWrapper = styled(Box)(({ theme }) => ({
  background: 'radial-gradient(circle, rgba(0,37,35,1),  rgb(0,87,80))',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '20px auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '20px',
  },
}));

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('-');
};

const TournamentDetail = ({ isAuthenticated }) => {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state?.from || `/tournaments/${type.toLowerCase()}`;

  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('ongoing');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const fetchTournamentAndMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const tournamentData = await getTournament(type, id);
        const matchesData = await getMatches(id);

        const updatedTournament = { ...tournamentData.data };
        const existingTeamIds = new Set(updatedTournament.teams.map(team => team.id));

        matchesData.data.forEach(match => {
          if (!existingTeamIds.has(match.team1.id)) {
            existingTeamIds.add(match.team1.id);
            updatedTournament.teams.push(match.team1);
          }
          if (!existingTeamIds.has(match.team2.id)) {
            existingTeamIds.add(match.team2.id);
            updatedTournament.teams.push(match.team2);
          }
        });
        setTournament(updatedTournament);
        console.log(updatedTournament);
        setMatches(matchesData.data);
        console.log(matchesData.data);

      } catch (error) {
        setError(error.message || 'Ошибка при загрузке данных.');
      }

      setLoading(false);
    };

    fetchTournamentAndMatches();
  }, [type, id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box className="loader">
          <Box className="half-ring"></Box>
        </Box>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }
  

  return (
    <>
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10 : 15 }}>
        <TournamentWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', fontFamily: 'Oswald, serif', flex: 1 }}>
              {tournament.name}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{
              mb: 6,
              color: 'white',
              textAlign: 'center',
              fontSize: isMobile ? '1rem' : '2rem',
              border: '1px solid rgb(0,142,130, 0.7)',
              padding: '4px',
              borderRadius: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => navigate(previousPage)} sx={{ color: 'white' }}>
              <ArrowCircleLeftOutlinedIcon fontSize="large" />
            </IconButton>
            <Box sx={{ flex: 1, textAlign: 'center', marginRight: '30px', fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.2rem' : '2rem' }}>
            {formatDate(tournament.date)}
            </Box>
          </Typography>

          <TournamentContent tournament={tournament} isMobile={isMobile} />

          <Box sx={{ mb: 6 }}>
            <MatchTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
          </Box>

          <Box>
            {matches.filter(match => match.status.toLowerCase() === selectedTab.toLowerCase()).map(match => (
              <MatchCard
                key={match.id}
                match={{ ...match, type: match.type || tournament.type }}
                isMobile={isMobile}
                from={`/tournaments/${tournament.type}/${tournament.id}`}
              />
            ))}
          </Box>
        </TournamentWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default TournamentDetail;


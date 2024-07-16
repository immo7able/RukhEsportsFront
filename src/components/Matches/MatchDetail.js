import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon } from '@mui/icons-material';
import Footer from '../Footer';
import MatchContent from './MatchContent';
import { getMatch } from '../../api/matches';

const MatchWrapper = styled(Box)(({ theme }) => ({
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

const MatchDetail = ({ isAuthenticated }) => {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state?.from || `/matches/${type.toLowerCase()}`;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMatch(id);
        setMatch(data);
      } catch (error) {
        setError('Матч не найден.');
      }
      setLoading(false);
    };
    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }
  

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!match) {
    return <Typography variant="h6" color="error">Матч не найден.</Typography>;
  }

  const youtubeVideoId = match.youtubeUrl ? match.youtubeUrl.split('v=')[1] : null;

  return (
    <>
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10:15 }}>
        <MatchWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: 'Oswald, serif',color: 'white', textAlign: 'center', flex: 1 }}>{match.title}</Typography>
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
            <Box sx={{ flex: 1, fontFamily: 'Oswald, serif',textAlign: 'center',  fontSize: isMobile ? '1.2rem' : '2rem' }}>
              {match.date}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2}}>
              <Box
                component="img"
                src="/images/rank.svg"
                alt="result icon"
                sx={{
                  width: isMobile ? 30 : 55,
                  height: isMobile ? 30 : 55,
                  mr: 1
                }}
              />
              <Typography variant="h6" sx={{ color: 'white', fontSize: isMobile ? 15 : 25 }}>
                {match.result}
              </Typography>
            </Box>
          </Typography>
          
          {youtubeVideoId && (
            <Box 
              sx={{ 
                mt: 4, 
                position: 'relative', 
                width: '100%', 
                paddingBottom: '56.25%', 
                height: 0,
                background: 'radial-gradient(circle, rgb(0,87,80), rgba(128,0,128,0.5))',
                borderRadius: '8px', 
                overflow: 'hidden', mb: 6 
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                frameBorder="0"
                allowFullScreen
                title="YouTube video player"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              ></iframe>
            </Box>
          )}

          <MatchContent match={match} isMobile={isMobile} />
        </MatchWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default MatchDetail;

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTheme } from '@mui/material/styles';
import Footer from '../../components/Footer';
import NPUBG from './NewsPUBG';
import NHOK from './NewsHOK';
import NMOB from './NewsMOB';
import AppTabs from '../../components/AppTabs';
import { getTopImage } from '../../api/imageApi'; 



const NewsPage = ({ isAuthenticated }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedTab = location.pathname.split('/')[2]?.toLowerCase() || 'pubg';
  const [topImage, setTopImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await getTopImage('news', selectedTab); 
        if (imageUrl && imageUrl.data && imageUrl.data.img) {
          setTopImage(imageUrl.data.img);
        } else {
          console.error('Image data is not available:', imageUrl);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    fetchImage();
  }, [selectedTab]);
  

  const topImageStyles = {
    width: '100%',
    height: isMobile ? 'auto' : '700px',
    marginTop: 0,
    borderRadius: '35px',
    display: 'block' 
  };

  return (
    <Box>
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10:15 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box
            sx={{
              width: '100%',
              background: 'radial-gradient(circle at bottom right, rgba(0,37,35,1), rgba(47,79,79,0.5), rgba(23,54,50,0.8))',
              borderRadius: 10,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box sx={{ width: '100%', position: 'relative', mb: 2 }}>
            {topImage && <img src={topImage} alt="Новости" style={topImageStyles} />}
            <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  borderRadius: '35px',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'flex-end',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    p: 2,
                    borderRadius: 2,
                    fontSize: isMobile ? '2.5rem' : '4.5rem',
                    fontFamily: 'Oswald, serif',
                  }}
                >
                  Новости
                </Typography>
              </Box>
            </Box>

            <AppTabs baseRoute="newspage" />

          </Box>
        </Box>

        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Box className="fade-in" sx={{ px: 2 }}>
              <Routes location={location}>
                <Route path="pubg" element={<NPUBG />} />
                <Route path="hok" element={<NHOK />} />
                <Route path="mob" element={<NMOB />} />
              </Routes>
            </Box>
          </CSSTransition>
        </TransitionGroup>

      </Container>
      <Footer />
    </Box>
  );
};

export default NewsPage;

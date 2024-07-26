import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Footer from '../components/Footer';
import logo1 from '../images/musruk2.png';
import logo2 from '../images/fin2.png';
import logo3 from '../images/ff2.png';
import {getMatches} from '../api/matches';
import { getTournaments } from '../api/tournaments';
import { getNews} from '../api/news';
import { getSliderImage } from '../api/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import TournamentTable from './TournamentTable';
import MatchesTable from './MatchesTable';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tournaments, setTournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [sliderImage, setSliderImage] = useState(null); 
  const [loading, setLoading] = useState(true);


  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
        setTournaments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке турниров:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        setMatches(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке матчей:', error);
      }
    };

    const fetchNewsItems = async () => {
      try {
        const response = await getNews();
        setNewsItems(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    const fetchSliderImage = async () => {
      try {
        const response = await getSliderImage();
        setSliderImage(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке изображения слайдера:', error);
      }
    };

    fetchTournaments();
    fetchMatches();
    fetchNewsItems();
    fetchSliderImage();
    setLoading(false); 
  }, []);

  if (loading) {
    return (
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }
  

  const slides = [
    { id: 0, image: sliderImage, title: 'Rukh Esport', type: '' },
    ...newsItems
  ];

  return (
    <Box>
      {!isMobile && (
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 0',
          }}
        >
          <a href="https://rukh.kz/" target="_blank" rel="noopener noreferrer">
            <img src={logo1} alt="Logo 1" style={{ maxHeight: '50px' }} />
          </a>
          <a href="https://fgroup.kz/" target="_blank" rel="noopener noreferrer">
            <img src={logo2} alt="Logo 2" style={{ maxHeight: '60px' }} />
          </a>
          <a href="https://ffins.kz/ru" target="_blank" rel="noopener noreferrer">
            <img src={logo3} alt="Logo 3" style={{ maxHeight: '100px' }} />
          </a>
        </Box>
      )}
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10:5 }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            slide.type ? (
              <Box
                key={index}
                component={Link}
                to={`/newspage/${slide.type}/${slide.id}`}
                state={{ from: `/newspage/${slide.type}` }}
                sx={{ position: 'relative', mb: 4, height: '400px', textDecoration: 'none' }}
              >
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '400px', borderRadius: '35px', objectFit: 'cover' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 8.5,
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
                      fontSize: isMobile ? '1.5rem' : '2.5rem',
                      fontFamily: 'Oswald, serif',
                    }}
                  >
                    {slide.title}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box key={index} sx={{ position: 'relative', mb: 4, height: '400px' }}>
                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '400px', borderRadius: '35px', objectFit: 'cover' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 8.5,
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
                      fontSize: isMobile ? '1.5rem' : '2.5rem',
                      fontFamily: 'Oswald, serif',
                    }}
                  >
                    {slide.title}
                  </Typography>
                </Box>
              </Box>
            )
          ))}
        </Slider>

        <Box sx={{ mb: isMobile ? 6 : 5 }}>
          <TournamentTable tournaments={tournaments.slice(0, 4)} />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              component={Link}
              to="/tournaments/pubg"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#008e82',
                borderRadius: '40px',
                ':hover': {
                  backgroundColor: '#145a2b'
                },
                fontSize: isMobile ? '1rem' : '1rem',
                fontFamily: 'Oswald, serif',
                padding: isMobile ? '8px 16px' : '12px 24px'
              }}
            >
              Больше турниров
            </Button>
          </Box>
        </Box>

        <Box>
          <MatchesTable matches={matches.slice(0, 6)} isMobile={isMobile} />
          <Box sx={{ textAlign: 'center', mt: isMobile ? 5 : 2 }}>
            <Button
              component={Link}
              to="/matches/pubg"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#008e82',
                borderRadius: '40px',
                ':hover': {
                  backgroundColor: '#145a2b'
                },
                fontSize: isMobile ? '1rem' : '1rem',
                fontFamily: 'Oswald, serif',
                padding: isMobile ? '8px 16px' : '12px 24px'
              }}
            >
              Больше матчей
            </Button>
          </Box>
        </Box>

      </Container>

      <Footer />
    </Box>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} mc-slick-next`}
      style={{ ...style, display: 'block', right: '10px', background: 'none' }} 
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} mc-slick-prev`}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1, background: 'none' }} 
      onClick={onClick}
    />
  );
};

export default HomePage;

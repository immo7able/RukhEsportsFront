import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Slider from 'react-slick';
import '../../styles/TeamContent.css';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitch } from 'react-icons/fa'; 
import { CgWebsite } from 'react-icons/cg';

const TeamInfo = ({ team }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const textStyles = {
    color: 'white',
    border: '0.8px solid white',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'inline-block',
  };

  const cardStyles = {
    background: 'linear-gradient(to top, rgba(0,37,35,1), rgba(47,79,79,0.7), rgba(176,196,222,1))',
    color: 'white',
    borderRadius: '40px',
    width: isMobile ? '100%' : '50%',
  };

  const mediaStyles = {
    objectFit: 'contain', 
    width: '100%',
    height: isMobile ? '350px' : '400px',
    borderRadius: '40px',
    mb: 2,
  };

  const renderIcon = (url) => {
    if (url.includes('facebook.com')) {
      return <FaFacebook />;
    } else if (url.includes('youtube.com')) {
      return <FaYoutube />;
    } else if (url.includes('instagram.com')) {
      return <FaInstagram />;
    } else if (url.includes('twitch.tv')) {
      return <FaTwitch />;
    } else {
      return <CgWebsite />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card sx={cardStyles}>
          <CardContent>
            <Slider {...sliderSettings} className="team-slider">
              {team.players.map(player => (
                <Box key={player.id} sx={{ textAlign: 'center',   }} className="team-slick-slide">
                  <CardMedia
                    component="img"
                    image={player.img}
                    alt={player.nickname}
                    sx={mediaStyles}
                  />
                  <Typography variant="h6" sx={{ ...textStyles, mb: 2, fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.2rem' : '2.5rem' }}>
                    {player.nickname}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.2rem' : '2rem' }}>
                    {player.name}, {player.content}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {player.socialMediaLinks && JSON.parse(player.socialMediaLinks).map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: 'white', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                          {renderIcon(link.url)}
                        </a>
                    ))}
                  </Box>
                </Box>
              ))}
            </Slider>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} team-slick-next`}
      style={{ ...style, display: 'block', right: '10px', background: 'none' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} team-slick-prev`}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1, background: 'none' }}
      onClick={onClick}
    />
  );
};

export default TeamInfo;

import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Card, CardContent, CardMedia, useMediaQuery, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/MatchContent.css';

const MatchContent = ({ match }) => {
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
    background: 'linear-gradient(to top, rgba(0,87,80), rgb(0,37,35,1), rgba(0,37,35,1))',
    color: 'white',
    borderRadius: '40px',
    mb: 4,
    width: isMobile ? '100%' : '40%',
    mt: isMobile ? 2 : 0,
    mx: isMobile ? 0 : 4,
  };

  const mediaStyles = {
    objectFit: 'contain',
    width: '100%',
    height: isMobile ? '320px' : '600px',
    borderRadius: '40px',
    mb: 2,
  };

  const renderTeam = (team) => (
    <Card sx={cardStyles}>
      <CardContent>
        <Slider {...sliderSettings} className="mc-slider">
          <Box sx={{ textAlign: 'center' }} className="mc-slick-slide">
            <CardMedia
              component="img"
              image={team.img}
              alt={team.name}
              sx={mediaStyles}
            />
            <Typography gutterBottom variant="h5" component="div" sx={{ ...textStyles, fontFamily: 'Oswald, serif' }}>
  {team.name}
</Typography>
          </Box>
          {team.players.map(player => (
            <Box key={player.id} sx={{ textAlign: 'center' }} className="mc-slick-slide">
              <CardMedia
                component="img"
                image={player.img}
                alt={player.nickname}
                sx={mediaStyles}
              />
             <Typography variant="h6" sx={{ ...textStyles, fontFamily: 'Oswald, serif', mb: 2 }}>
  {player.nickname}
</Typography>
            </Box>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        {renderTeam(match.team1)}
        {renderTeam(match.team2)}
      </Box>
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

export default MatchContent;

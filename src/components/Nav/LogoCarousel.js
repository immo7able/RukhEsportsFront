import React from 'react';
import Slider from 'react-slick';
import { styled } from '@mui/system';
import { Link } from '@mui/material';
import logo1 from '../../images/musruk2.png';
import logo2 from '../../images/fin2.png';
import logo3 from '../../images/ff2.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LogoSlider = styled(Slider)(({ theme }) => ({
  '.slick-slide': {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 -30px', // уменьшает разрывы между слайдами

  },
  '.slick-track': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  maxWidth: '60%',
  maxHeight: '60%',
  objectFit: 'contain',
}));

const SlideContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: 'auto',
  textDecoration: 'none',
}));

const LogoCarousel = () => {
  const settings = {
    infinite: true,
    speed: 10000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    initialSlide: 0, // начальный слайд
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <LogoSlider {...settings}>
      <SlideContainer>
        <StyledLink href="https://rukh.kz/" target="_blank" rel="noopener">
          <LogoImage src={logo1} alt="Logo 1" />
        </StyledLink>
      </SlideContainer>
      <SlideContainer>
        <StyledLink href="https://fgroup.kz/" target="_blank" rel="noopener">
          <LogoImage src={logo2} alt="Logo 2" />
        </StyledLink>
      </SlideContainer>
      <SlideContainer>
        <StyledLink href="https://ffins.kz/ru" target="_blank" rel="noopener">
          <LogoImage src={logo3} alt="Logo 3" />
        </StyledLink>
      </SlideContainer>
    </LogoSlider>
  );
};

export default LogoCarousel;

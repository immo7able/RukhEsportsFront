import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../styles/heartAnime.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const LikeButtonWithCounter = ({ likeCount, liked, onClick }) => {
  const [hearts, setHearts] = useState([]);

  const handleClick = (event) => {
    onClick();

    if (!liked) {
      const newHearts = Array.from({ length: 10 }, () => ({
        id: Date.now() + Math.random(),
        left: event.clientX,
        top: event.clientY,
        translateX: `${getRandomInt(-100, 100)}px`,
        translateY: `${getRandomInt(-100, 100)}px`
      }));

      setHearts((prevHearts) => [...prevHearts, ...newHearts]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => !newHearts.some((h) => h.id === heart.id)));
      }, 1000);
    } else {
      const newHeart = {
        id: Date.now(),
        left: event.clientX,
        top: event.clientY,
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);

      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
      }, 1000);
    }
  };

  const getSize = (count) => {
    const length = count.toString().length;
    return `${16 + length * 10}px`;
  };

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative', fontFamily: 'Oswald, serif' }}>
      {hearts.map((heart) => (
        <FavoriteIcon
          key={heart.id}
          className={liked ? 'bursting-heart' : 'falling-heart'}
          sx={{ 
            left: heart.left, 
            top: heart.top, 
            color: '#008e82', 
            fontSize: { xs: '1.7rem', sm: '1rem' }, 
            position: 'fixed',
            '--translateX': heart.translateX,
            '--translateY': heart.translateY
          }}
        />
      ))}
      <Box
        className={`like-counter-box ${liked ? 'liked' : 'unliked'}`}  
        sx={{ 
          fontSize: { xs: '1rem', sm: '1.5rem' },
          width: getSize(likeCount),
          height: '27px',
        }}
      > 
        {likeCount}
      </Box>
      <IconButton
        onClick={handleClick}
        className={liked ? 'heart-icon' : ''}
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}
      >
        <FavoriteIcon sx={{ color: liked ? '#008e82' : 'rgb(4,141,131, 0.5)', fontSize: 'inherit' }} />
      </IconButton>
    </Box>
  );
};

export default LikeButtonWithCounter;

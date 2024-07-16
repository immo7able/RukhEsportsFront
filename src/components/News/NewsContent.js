import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';

const NewsContent = ({ newsItem, isMobile }) => {
  return (
    <>
      <Box sx={{ position: 'relative', height: isMobile ? '400px':'600px', mb: 6, padding: isMobile ? '5px': '40px' }}>
        <CardMedia
          component="img"
          image={newsItem.image}
          alt={newsItem.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(15px)',
            zIndex: 1,
          }}
        />
        <CardMedia
          component="img"
          image={newsItem.image}
          alt={newsItem.title}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 2,
          }}
        />
      </Box>
      
      <Box 
  sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    mb: 4, 
    color: 'white', 
    position: 'relative', 
  }}
>
  <Box 
    sx={{ 
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderLeft: '2px solid rgb(4,141,131, 0.7)',
        height: '100%'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderRight: '2px solid rgb(4,141,131, 0.7)',
        height: '100%'
      },
      width: '100%',
      px: 2
    }}
  >
    <Typography variant="body1" sx={{ 
    fontSize: isMobile ? '1.3rem' : '2rem' , fontFamily: 'Oswald, serif'
  }}>
      {newsItem.content}
    </Typography>
  </Box>
</Box>
    </>
  );
};

export default NewsContent;

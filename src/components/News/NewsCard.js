import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('-');
};


const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const NewsCard = ({ newsItem, isMobile }) => {
  return (
    <Card 
      key={newsItem.id} 
      component={Link} 
      to={`/newspage/${newsItem.type}/${newsItem.id}`}
      state={{ from: `/newspage/${newsItem.type}` }} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        backgroundColor: 'rgba(23,54,50,0.65)', 
        border: '1px solid rgb(0,142,130, 0.5)', 
        borderRadius: '10px', 
        padding: '5px',
        maxWidth: isMobile ? '100%' : '500px',  
        margin: isMobile ? '0 auto' : 'unset',  
        textDecoration: 'none'  
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ height: isMobile ? 200 : 250, borderRadius: '8px' }}  
          image={newsItem.image}
          alt={`Изображение для ${newsItem.title}`}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>

      <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            width: '100%'
          }}
        > 
        <Typography variant="h6" sx={{ fontSize: isMobile ? 20 : 25, color: 'white',fontFamily: 'Oswald, serif', }}>
          {newsItem.title}
        </Typography>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: '#008e82' }} />

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            width: '100%'
          }}
        > 
        <Typography sx={{ fontSize: isMobile ? 17 : 22,color: 'white',fontFamily: 'Oswald, serif', }}>
          {truncateText(newsItem.content, 80)}
        </Typography>
        </Box>
        
        <Divider sx={{ my: 2, backgroundColor: '#008e82' }} />

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            width: '100%'
          }}
        > 
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

  <Typography sx={{ fontSize: isMobile ? 20 : 25, color: 'white',fontFamily: 'Oswald, serif', }}>
  {formatDate(newsItem.date)}

  </Typography>
  </Box>
        </Box>

      </CardContent>
    </Card>
  );
};

export default NewsCard;

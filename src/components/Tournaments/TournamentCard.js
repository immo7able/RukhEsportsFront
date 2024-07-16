import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import '../../styles/TournamentCard.css';


const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const TournamentCard = ({ tournament, isMobile }) => {
  return (
    <Card 
      key={tournament.id} 
      component={Link} 
      to={`/tournaments/${tournament.type}/${tournament.id}`}
      state={{ from: `/tournaments/${tournament.type}` }} 
      className="glow-card" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        background: 'linear-gradient(to bottom, rgba(0,37,35,1), rgb(0,87,80))',
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
          image={tournament.img}
          alt={`Изображение для ${tournament.name}`}
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
          <Typography variant="h6" sx={{ fontSize: isMobile ? 20 : 25, color: 'white', fontFamily: 'Oswald, serif', }}>
            {tournament.name}
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
        <Typography sx={{ fontSize: isMobile ? 17 : 22, color: 'white', fontFamily: 'Oswald, serif', }}>
          {truncateText(tournament.content, 80)}
        </Typography>
        </Box>
        <Divider sx={{ my: 2, backgroundColor: '#008e82' }} />

        <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: '100%', 
    width: '100%'
  }}
>
<Box sx={{ display: 'flex', alignItems: 'center' }}>

  <Typography sx={{ fontSize: isMobile ? 20 : 25, color: 'white', fontFamily: 'Oswald, serif', }}>
    {tournament.date}
  </Typography>
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <EmojiEventsIcon sx={{ color: 'white', mr: 1 }} />
    <Typography sx={{ fontSize: isMobile ? 20 : 25, color: 'white', fontFamily: 'Oswald, serif', }}>
      {tournament.prizepool}
    </Typography>
  </Box>
</Box>

        
      </CardContent>
    </Card>
  );
};

export default TournamentCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const MatchCard = ({ match, isMobile, from }) => (
  <Link 
    to={`/matches/${match.discipline}/${match.id}`}
    state={{ from: from }}
    style={{ textDecoration: 'none' }}
  >
    <Card 
      key={match.id} 
      sx={{ 
        position: 'relative', 
        mb: isMobile ? 2 : 4, 
        border: '4px solid transparent', 
        background: 'radial-gradient(circle, rgb(0,87,80),  rgba(128,0,128,0.5))', 
        borderRadius: '16px', 
        overflow: 'hidden'
      }}
    >
      <CardMedia 
        component="img" 
        sx={{ 
          height: isMobile ? 150 : 320, 
          objectFit: 'cover', 
        }} 
        image={match.img} 
        alt="Match Image" 
      />
      <CardContent
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          textAlign: 'center',
          padding: isMobile ? '8px' : '16px',
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? '1.1rem' : '2rem', mb: 2 }}>{match.title}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%', marginBottom: 4 }}>
            <img src={match.team1.img} alt={match.team1.name} style={{ height: isMobile ? 50 : 100 }} />
            <Typography sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? '1.1rem' : '2rem' }}>{match.team1.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%', marginBottom: 4 }}>
            <Typography sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? '1.1rem' : '2rem' }}>{match.date}</Typography>
            <Typography sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? '1.1rem' : '2rem' }}>{match.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%', marginBottom: 4 }}>
            <img src={match.team2.img} alt={match.team2.name} style={{ height: isMobile ? 50 : 100 }} />
            <Typography sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? '1.1rem' : '2rem' }}>{match.team2.name}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Link>
);

export default MatchCard;

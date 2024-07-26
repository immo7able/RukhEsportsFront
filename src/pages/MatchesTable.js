import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const MatchesTable = ({ matches, isMobile, from }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isMobile ? 2 : 1.5 }}>
      {matches.map((match) => (
        <Link 
          key={match.id} 
          to={`/matches/${match.discipline}/${match.id}`}
          state={{ from: from }}
          style={{ textDecoration: 'none', flexBasis: isMobile ? 'calc(50% - 16px)' : 'auto',  }}
        >
          <Card 
            sx={{ 
              position: 'relative', 

              border: '4px solid transparent', 
              background: 'radial-gradient(circle, rgb(0,87,80), rgba(128,0,128,0.5))', 
              borderRadius: '16px', 
              overflow: 'hidden',
              width: isMobile ? '100%' : '390px',
              height: isMobile ? 'auto' : '200px'
            }}
          >
            <CardMedia 
              component="img" 
              sx={{ 
                height: isMobile ? 100 : 320, 
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
                padding: '16px',
              }}
            >
             <Typography
  variant="h6"
  sx={{
    fontFamily: 'Oswald, serif',
    fontSize: isMobile ? '0' : '1.6rem', 
    mb: 1,
    visibility: isMobile ? 'hidden' : 'visible' 
  }}
>
  {match.title}
</Typography>
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '30%' : '25%', marginBottom: 4 }}>
    <img src={match.team1.img} alt={match.team1.name} style={{ height: isMobile ? 40 : 70 }} />
    <Typography sx={{ fontFamily: 'Oswald, serif', fontSize: isMobile ? '0.9rem' : '1.3rem' }}>
      {match.team1.name}
    </Typography>
  </Box>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '60%' : '40%', marginBottom: 4 }}>
    <img src={match.team2.img} alt={match.team2.name} style={{ height: isMobile ? 40 : 70 }} />
    <Typography sx={{ fontFamily: 'Oswald, serif', fontSize: isMobile ? '1rem' : '1.3rem' }}>
      {match.team2.name}
    </Typography>
  </Box>
              </Box>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default MatchesTable;

import React from 'react';
import { Box, useMediaQuery, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const TournamentTable = ({ tournaments, from }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isMobile ?  0:2 }}>
      {tournaments.map((tournament) => (
        <Link
          to={`/tournaments/${tournament.discipline}/${tournament.id}`}
          state={{ from }}
          style={{ textDecoration: 'none' }}
          key={tournament.id}
        >
          <Card
            sx={{
              position: 'relative',
              
            
              background: 'radial-gradient(circle, rgba(0,37,35,1), rgb(0,87,80))',
              border: '1px solid rgb(0,142,130)', 
              borderRadius: '16px',
              overflow: 'hidden',
              width: isMobile ? '100%' : '600px',
              height: isMobile ? '75%' : '200px'
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: isMobile ? 150 : 320,
                objectFit: 'cover',
              }}
              image={tournament.img}
              alt="Tournament Image"
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
              <Typography variant="h6" sx={{ fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.1rem' : '2rem', mb: 2 }}>
                {tournament.name}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.7rem' : '1.5rem' }}>
                {tournament.prizepool}₸
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

export default TournamentTable;

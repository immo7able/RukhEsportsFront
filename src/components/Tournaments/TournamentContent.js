import React from 'react';
import { Box, Typography, CardMedia, Divider } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TournamentContent = ({ tournament, isMobile }) => {
  return (
    <>
      <Box sx={{ position: 'relative', height: isMobile ? '400px' : '600px', mb: 6, padding: isMobile ? '5px' : '40px' }}>
        <CardMedia
          component="img"
          image={tournament.img}
          alt={tournament.name}
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
          image={tournament.img}
          alt={tournament.name}
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
          <Typography variant="body1" sx={{ fontFamily: 'Oswald, serif', fontSize: isMobile ? '1.3rem' : '2rem' }}>
            {tournament.content}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid white', padding: 2, borderRadius: 8, mr: 2 }}>
            <EmojiEventsIcon sx={{ color: 'white', width: isMobile ? 35 : 55, height: isMobile ? 35 : 55, mr: 1 }} />
            <Typography sx={{ fontSize: isMobile ? 17 : 25, fontFamily: 'Oswald, serif', color: 'white' }}>
              {tournament.prizepool}
            </Typography>
          </Box>
          {tournament.status === 'Completed' && (
            <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid white', padding: 2, borderRadius: 8 }}>
              <Box
                component="img"
                src="/images/rank.svg"
                alt="result icon"
                sx={{ 
                  width: isMobile ? 30 : 55, 
                  height: isMobile ? 30 : 55, 
                  mr: 1 
                }}
              />
              <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Oswald, serif', fontSize: isMobile ? 15 : 25 }}>
                {tournament.result}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4, border: '2px solid white', borderRadius: 8, p: 2, color: 'white' }}>
  <Typography variant="h6" sx={{ mb: 3, textAlign: 'center',fontFamily: 'Oswald, serif', fontSize: isMobile ? 25 : 50 }}>
    Команды
  </Typography>
  {tournament.teams && tournament.teams.map((team, index) => (
    <Box key={index} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Box
          sx={{ 
            width: isMobile ? 70 : 120,
            height: isMobile ? 70 : 120,
            overflow: 'hidden',
            mr: 2 
          }}
        >
          <Box
            component="img"
            src={team.logo}
            alt={team.name}
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="body1" sx={{ fontFamily: 'Oswald, serif',fontSize: isMobile ? 25 : 50 }}>
          {team.name}
        </Typography>
      </Box>
      {index < tournament.teams.length - 1 && (
        <Divider sx={{ bgcolor: 'white' }} />
      )}
    </Box>
  ))}
</Box>

      </Box>
    </>
  );
};

export default TournamentContent;

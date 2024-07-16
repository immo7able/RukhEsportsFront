import React from 'react';
import { Tabs, Tab, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MatchTabs = ({ selectedTab, handleTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
        sx={{ 
          border: '2px solid rgba(0,87,80)', 
          borderRadius: '40px', 
          padding: '16px', 
          marginTop: '16px'
        }}
      >
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      aria-label="match tabs"
      centered
      TabIndicatorProps={{ style: { backgroundColor: 'rgb(4,141,131, 0.7)', height: '4px', borderRadius: '2px' } }}
      sx={{
        '& .MuiTab-root': {
          fontSize: isMobile ? '1rem' : '1.5rem',
          fontWeight: 'bold',
          textTransform: 'none',
          color: '#555',
          padding: isMobile ? '8px' : '12px 24px',
          transition: 'color 0.3s ease-in-out',
          '&.Mui-selected': {
            color: 'rgb(4,141,131, 0.7)',
          },
          '&:hover': {
            color: 'rgb(4,141,131, 0.7)',
          },
        },
      }}
    >
      <Tab label="Идут сейчас" value="ongoing" />
      <Tab label="Грядут" value="upcoming" />
      <Tab label="История" value="completed" />
    </Tabs>
    </Box>
  );
};

export default MatchTabs;

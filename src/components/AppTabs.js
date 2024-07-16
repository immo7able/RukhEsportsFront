import React from 'react';
import { Box, Tabs, Tab, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import tabImage1 from '../images/pub1.png';
import tabImage2 from '../images/hok.png';
import tabImage3 from '../images/mob.png';

const AppTabs = ({ baseRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectedTab = location.pathname.split('/')[2]?.toLowerCase() || 'pubg';

  const handleTabChange = (event, newValue) => {
    navigate(`/${baseRoute}/${newValue}`);
  };

  const tabImage1Styles = {
    height: { xs: '60px', sm: '110px' },
    width: 'auto',
  };

  const tabImageStyles = {
    height: { xs: '30px', sm: '70px' },
    width: 'auto',
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      aria-label="tabs"
      centered
      TabIndicatorProps={{ style: { backgroundColor: '#008e82', height: '4px', borderRadius: '2px' } }}
      sx={{
        '& .MuiTab-root': {
          fontSize: isMobile ? '0.75rem' : '1.25rem',
          fontWeight: 'bold',
          textTransform: 'none',
          color: '#555',
          padding: isMobile ? '8px' : '12px 24px',
          transition: 'color 0.3s ease-in-out',
          '&.Mui-selected': {
            color: '#008e82',
          },
          '&:hover': {
            color: '#008e82',
          },
        },
      }}
    >
      <Tab icon={<Box component="img" src={tabImage1} alt="PUBG" sx={tabImage1Styles} />} value="pubg" />
      <Tab icon={<Box component="img" src={tabImage2} alt="HOK" sx={tabImageStyles} />} value="hok" />
      <Tab icon={<Box component="img" src={tabImage3} alt="MOB" sx={tabImageStyles} />} value="mob" />
    </Tabs>
  );
};

export default AppTabs;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, Box, Avatar } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { getProfile} from '../../api/profile';

// import LogoCarousel from './LogoCarousel';

import {
  Search as SearchIcon, AccountCircle,
} from '@mui/icons-material';
import logo from '../../images/logo.PNG';

const MenuItemBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: '#008e82',
  '& a': {
    fontSize: '1.8rem',
  },
}));

const DesktopNavBar = ({ menuItems, handleAccountClick }) => {
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState('');
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfileImage(response.data.avatar || '');
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
        <img src={logo} alt="RUKH Esports" style={{ height: 80, marginLeft: '70px', marginTop: '10px' }} />
      </Typography>
      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly' }}>
        {menuItems.map((item, index) => (
          <MenuItemBox key={index}>
            <Typography
              variant="body1"
              component={Link}
              to={item.path}
              sx={{ margin: theme.spacing(3.5),fontFamily: 'Oswald, serif', textDecoration: 'none', color: 'inherit' }}
            >
              {item.text}
            </Typography>
          </MenuItemBox>
        ))}
      </Box>
      
      <div>
      <IconButton color="inherit" onClick={handleAccountClick}>
      {profileImage ? (
        <Avatar src={profileImage} sx={{ width: 35, height: 35 }} />
      ) : (
        <AccountCircle sx={{ fontSize: '35px !important', color: 'rgb(0,142,130, 0.8)' }} />
      )}
    </IconButton>
      </div>
    </>
  );
};

export default DesktopNavBar;

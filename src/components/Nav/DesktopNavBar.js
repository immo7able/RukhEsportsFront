import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Typography, Box } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import LogoCarousel from './LogoCarousel';

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
          <AccountCircle sx={{ fontSize: '30px !important', color: '#008e82' }} />
        </IconButton>
      </div>
    </>
  );
};

export default DesktopNavBar;

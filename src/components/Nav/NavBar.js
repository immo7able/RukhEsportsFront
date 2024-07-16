import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, Box, useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import {
  Menu as MenuIcon, AccountCircle, Close as CloseIcon
} from '@mui/icons-material';
import DesktopNavBar from './DesktopNavBar';
import LogoCarousel from './LogoCarousel';
import MenuList from './MenuList';
import logo from '../../images/logo.PNG';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between',
  },
}));

const NavBar = ({ isAuthenticated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAccountClick = () => {
    navigate(isAuthenticated ? '/profile' : '/signup');
    setDrawerOpen(false);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Главная', path: '/' },
    { text: 'Новости', path: '/newspage/PUBG' },
    { text: 'Турниры', path: '/tournaments/PUBG' },
    { text: 'Матчи', path: '/matches/pubg' },
    { text: 'Команды', path: '/team/pubg' },
    ];

  const list = () => (
    <Box
      sx={{ width: '100vw', height: '100vh', bgcolor: 'white', color: 'black' }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px',
          bgcolor: 'black',
          color: 'white',
        }}
      >
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ fontSize: '35px !important', color: 'rgb(0,142,130, 0.8)' }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
          <img src={logo} alt="RUKH Esports" style={{ height: 50, marginLeft: '35px' }} />
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={handleAccountClick}>
            <AccountCircle sx={{ fontSize: '35px !important', color: 'rgb(0,142,130, 0.8)' }} />
          </IconButton>
        </Box>
      </Box>
      <MenuList menuItems={menuItems} handleMenuItemClick={handleMenuItemClick} />
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ width: '100%', bgcolor: 'black' }}>
      <StyledToolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ fontSize: '35px !important', color: '#008e82' }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', maxWidth: '70%' }}>
              <LogoCarousel />
            </Box>
            <Typography variant="h6" component="div" sx={{ textAlign: 'right' }}>
              <img src={logo} alt="RUKH Esports" style={{ height: 50, marginRight: 0 }} />
            </Typography>
          </>
        ) : (
          <DesktopNavBar menuItems={menuItems} handleAccountClick={handleAccountClick} />
        )}
      </StyledToolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;

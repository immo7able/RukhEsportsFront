import React from 'react';
import { Box, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="footer" sx={{ bgcolor: 'rgba(0, 142, 130, 0.7)', color: 'white', padding: '40px 0', textAlign: 'center', marginTop: '80px' }}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap="70px">
        <Box display="flex" justifyContent="center" gap="8px">
          <Link href="https://twitter.com" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
            <TwitterIcon />
          </Link>
          <Link href="https://instagram.com" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
            <InstagramIcon />
          </Link>
          <Link href="https://facebook.com" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
            <FacebookIcon />
          </Link>
          <Link href="https://youtube.com" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
            <YouTubeIcon />
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" gap="10px">
          <Link href="/kz" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            KZ
          </Link>
          <Link href="/en" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            ENG
          </Link>
          <Link href="/ru" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            РУ
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

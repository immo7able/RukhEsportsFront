import React from 'react';
import { Box, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SlSocialVkontakte } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="footer" sx={{ bgcolor: 'rgba(0, 142, 130, 0.7)', color: 'white', padding: '40px 0', textAlign: 'center', marginTop: '80px' }}>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" gap="70px" fontSize={30}>
        <Box display="flex" justifyContent="center" gap="8px" >
          <Link href="https://vk.com/rukhesports" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
          <SlSocialVkontakte />
          </Link>
          <Link href="https://www.instagram.com/rukh_esports/" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
          <FaInstagram />
          </Link>
          <Link href="https://www.youtube.com/@RUKH_ESPORTS" color="inherit" target="_blank" rel="noopener" className="footer-social-network-icons">
          <CiYoutube />

          </Link>
        </Box>
        {/* <Box display="flex" justifyContent="center" gap="10px">
          <Link href="/kz" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            KZ
          </Link>
          <Link href="/en" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            ENG
          </Link>
          <Link href="/ru" color="inherit" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            РУ
          </Link>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Footer;

import React from 'react';
import { Container, Tabs, Tab, Box, Typography, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NewsManagement from './news/NewsManagement';
import MatchManagement from './matches/MatchManagement';
import TournamentManagement from './tournaments/TournamentManagement';
import TeamManagement from './team/TeamManagement';
import CoverManagement from './CoverManagement';
import CarouselManagement from './CarouselManagement';
import Comments from './news/Comments';
import NotesManagement from './NotesManagement';

const AdminPanel = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    fontSize: 16,
    color: '#FFFFFF',
    px: 2,
    py: 1,
    borderRadius: 2,
    transition: '0.3s',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.4)',
    },
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundSize: 'cover',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: isSmallScreen ? '100%' : '1600px',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'row' : 'column',
            width: isSmallScreen ? '100%' : '20%',
            alignItems: 'center',
            mb: isSmallScreen ? 2 : 0,
          }}
        >
          <Tabs
            orientation={isSmallScreen ? 'horizontal' : 'vertical'}
            value={value}
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold',
                color: '#FFFFFF',
                '&.Mui-selected': {
                  color: '#FFFFFF',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FFFFFF',
              },
              width: '100%',
            }}
          >
            <Tab sx={tabStyle} label="Новости" />
            <Tab sx={tabStyle} label="Комментарии" />
            <Tab sx={tabStyle} label="Команды и игроки" />
            <Tab sx={tabStyle} label="Турниры" />
            <Tab sx={tabStyle} label="Матчи" />
            <Tab sx={tabStyle} label="Обложки" />
            <Tab sx={tabStyle} label="Карусель главная" />
            <Tab sx={tabStyle} label="Памятка использования" />
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <TabPanel value={value} index={0}>
            <NewsManagement />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Comments />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TeamManagement />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TournamentManagement />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <MatchManagement />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <CoverManagement />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <CarouselManagement />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <NotesManagement />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default AdminPanel;

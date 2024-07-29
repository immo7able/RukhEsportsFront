import React from 'react';
import { Container, Tabs, Tab, Box, Typography} from '@mui/material';
import NewsManagement from './news/NewsManagement';
import MatchManagement from './matches/MatchManagement';
import TournamentManagement from './tournaments/TournamentManagement';
import TeamManagement from './team/TeamManagement';
import CoverManagement from './CoverManagement';
import CarouselManagement from './CarouselManagement';

const AdminPanel = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    fontSize: 20,
    color: 'rgba(0, 0, 0,)',
    borderRadius: 2,
    p: 2,
    boxShadow: 3,
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.4)',
    },
    m: 2,
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/path/to/your/background/image.jpg")',
        backgroundSize: 'cover',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
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
          }}
        >
          <Tab sx={tabStyle} label="Новости" />
          <Tab sx={tabStyle} label="Матчи" />
          <Tab sx={tabStyle} label="Турниры" />
          <Tab sx={tabStyle} label="Команды и игроки" />
          <Tab sx={tabStyle} label="Обложки" />
          <Tab sx={tabStyle} label="Карусель главная страница" />  
        </Tabs>
        <TabPanel value={value} index={0}>
          <NewsManagement />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MatchManagement />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TournamentManagement />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TeamManagement />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <CoverManagement />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <CarouselManagement /> 
        </TabPanel>
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

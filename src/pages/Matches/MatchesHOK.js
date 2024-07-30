import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MatchesList from '../../components/Matches/MatchList';
import MatchesTabs from '../../components/Matches/MatchTabs';
import { getMatchesByDiscipline} from '../../api/matches';


const MHOK = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatchesByDiscipline('hok');
        setMatches(data.data);
      } catch (error) {
        setError('Ошибка при загрузке данных матчей');
      }
      setLoading(false);
    };

    fetchMatches();

  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box className="loader">
          <Box className="half-ring"></Box>
        </Box>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }
  

  return (
    <div>
      <MatchesTabs baseRoute="matches/hok" selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <MatchesList matchesData={matches} type="HOK" status={selectedTab} />
    </div>
  );
};

export default MHOK;

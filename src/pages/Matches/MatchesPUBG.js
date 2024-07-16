import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MatchesList from '../../components/Matches/MatchList';
import MatchesTabs from '../../components/Matches/MatchTabs';
import { getMatches } from '../../api/matches'; 

const MPUBG = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches('pubg');
        setMatches(data);
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
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <MatchesTabs baseRoute="matches/pubg" selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <MatchesList matchesData={matches} type="PUBG" status={selectedTab} />
    </div>
  );
};

export default MPUBG;

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TournamentList from '../../components/Tournaments/TournamentList';
import TournamentsTabs from '../../components/Tournaments/TournamentsTabs';
import { getTournament } from '../../api/tournaments'; 


const THOK = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchTournaments = async () => {
      try {
        const data = await getTournament('hok');
        setTournaments(data);
      } catch (error) {
        setError('Ошибка при загрузке данных турниров');
      }
      setLoading(false);
    };

    fetchTournaments();
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
      <TournamentsTabs baseRoute="tournaments/hok" selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <TournamentList tournamentsData={tournaments} type="HOK" status={selectedTab} />
    </div>
  );
};

export default THOK;

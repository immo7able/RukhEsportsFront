import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TeamInfo from './TeamInfo';
import { getTeam } from '../../api/team';

const TEAMMOB = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await getTeam('mob');
        setTeam(response.data);
      } catch (error) {
        setError('Ошибка при загрузке данных команды или игроков');
      }
      setLoading(false);
    };

    fetchTeamData();
  }, []);

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
  

  if (!team) {
    return <Typography variant="h6" color="error">Команда не найдена.</Typography>;
  }

  return <TeamInfo team={team} />;
};

export default TEAMMOB;

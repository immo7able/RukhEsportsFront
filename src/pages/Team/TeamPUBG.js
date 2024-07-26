import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TeamInfo from './TeamInfo';
import { getTeam} from '../../api/team';

const TEAMPUBG = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchTeamData = async () => {
      try {
        const teamData = await getTeam('pubg');
        setTeam(teamData.data);
      } catch (error) {
        setError('Ошибка при загрузке данных команды или игроков');
      }
      setLoading(false);
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!team) {
    return <Typography variant="h6" color="error">Команда не найдена.</Typography>;
  }

  return <TeamInfo team={team} />;
};

export default TEAMPUBG;

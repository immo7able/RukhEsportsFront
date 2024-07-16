import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TeamInfo from './TeamInfo';
import { getTeam, getPlayer } from '../../api/team';

const TEAMHOK = () => {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchTeamData = async () => {
      try {
        const teamData = await getTeam('hok');
        setTeam(teamData);
        
        if (teamData && teamData.id) {
          const playersData = await getPlayer(teamData.id);
          setPlayers(playersData);
        }
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

  return <TeamInfo team={team} players={players} />;
};

export default TEAMHOK;

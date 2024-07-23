import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api'; 
import { getTeam } from '../../api/team'; 

const DeleteTeam = () => {
  const [id, setId] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeam();
        setTeams(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      const team = teams.find((item) => item.id === selectedTeam);
      if (team) {
        setId(team.id);
      }
    }
  }, [selectedTeam, teams]);

  const handleSubmit = async () => {
    try {
      await api.delete(`/teams/${id}`);
      alert('Команда удалена успешно!');
    } catch (error) {
      alert('Ошибка при удалении команды!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', my: '20%', width: '80%', maxWidth: '500px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="team-select-label">Выбрать команду</InputLabel>
        <Select
          labelId="team-select-label"
          value={selectedTeam}
          label="Выбрать команду"
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="ID команды"
        fullWidth
        value={id}
        onChange={(e) => setId(e.target.value)}
        sx={{ mb: 2 }}
        disabled
      />
      <Button variant="contained" onClick={handleSubmit}>Удалить</Button>
    </Box>
  );
};

export default DeleteTeam;

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api'; 
import { getTournament } from '../../api/tournaments'; 

const DeleteTournament = () => {
  const [id, setId] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournament();
        setTournaments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке турниров:', error);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournament) {
      const tournament = tournaments.find((item) => item.id === selectedTournament);
      if (tournament) {
        setId(tournament.id);
      }
    }
  }, [selectedTournament, tournaments]);

  const handleSubmit = async () => {
    try {
      await api.delete(`/tournaments/${id}`);
      alert('Турнир удален успешно!');
    } catch (error) {
      alert('Ошибка при удалении турнира!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', my: '20%', width: '80%', maxWidth: '500px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="tournament-select-label">Выбрать турнир</InputLabel>
        <Select
          labelId="tournament-select-label"
          value={selectedTournament}
          label="Выбрать турнир"
          onChange={(e) => setSelectedTournament(e.target.value)}
        >
          {tournaments.map((tournament) => (
            <MenuItem key={tournament.id} value={tournament.id}>
              {tournament.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="ID турнира"
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

export default DeleteTournament;

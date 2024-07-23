import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api'; 
import { getMatches } from '../../api/matches';

const DeleteMatch = () => {
  const [id, setId] = useState('');
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        setMatches(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке матчей:', error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    if (selectedMatch) {
      const match = matches.find((item) => item.id === selectedMatch);
      if (match) {
        setId(match.id);
      }
    }
  }, [selectedMatch, matches]);

  const handleSubmit = async () => {
    try {
      await api.delete(`/matches/${id}`);
      alert('Матч удален успешно!');
    } catch (error) {
      alert('Ошибка при удалении матча!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', my: '20%', width: '80%', maxWidth: '500px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="match-select-label">Выбрать матч</InputLabel>
        <Select
          labelId="match-select-label"
          value={selectedMatch}
          label="Выбрать матч"
          onChange={(e) => setSelectedMatch(e.target.value)}
        >
          {matches.map((match) => (
            <MenuItem key={match.id} value={match.id}>
              {match.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="ID матча"
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

export default DeleteMatch;

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api'; 
import { getPlayer } from '../../api/team';

const DeletePlayer = () => {
  const [id, setId] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getPlayer();
        setPlayers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке игроков:', error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    if (selectedPlayer) {
      const player = players.find((item) => item.id === selectedPlayer);
      if (player) {
        setId(player.id);
      }
    }
  }, [selectedPlayer, players]);

  const handleSubmit = async () => {
    try {
      await api.delete(`/admin/deletePlayer/${id}`);
      alert('Игрок удален успешно!');
    } catch (error) {
      alert('Ошибка при удалении игрока!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', my: '20%', width: '80%', maxWidth: '500px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="player-select-label">Выбрать игрока</InputLabel>
        <Select
          labelId="player-select-label"
          value={selectedPlayer}
          label="Выбрать игрока"
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {players.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {player.nickname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="ID игрока"
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

export default DeletePlayer;

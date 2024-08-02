import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 
import { getTournaments } from '../../api/tournaments';

const DeleteTournament = () => {
  const [id, setId] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    try {
      await api.delete(`/admin/deleteTournament/${id}`);
      setSnackbarMessage('Турнир удален успешно! Нажмите на пустое пространство чтобы закрыть окно');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при удалении турнира!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 4,
          maxWidth: '500px',
          mx: 'auto',
          my: '20%',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#FFFFFF',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Удаление турнира
        </Typography>
        <FormControl fullWidth sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFFFFF',
          },
          '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          '& .MuiSvgIcon-root': { color: '#FFFFFF' },
        }}>
          <InputLabel id="tournament-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать турнир</InputLabel>
          <Select
            labelId="tournament-select-label"
            value={selectedTournament}
            label="Выбрать турнир"
            onChange={(e) => setSelectedTournament(e.target.value)}
            sx={{ fontSize: '1.5rem' }}
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                },
              },
            }}
          >
            {tournaments.map((tournament) => (
              <MenuItem key={tournament.id} value={tournament.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
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
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF' },
            },
            '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
            '& .MuiSvgIcon-root': { color: '#FFFFFF' },
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
          disabled
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            width: '100%',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: '#FFFFFF',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2,
            transition: '0.3s',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            },
          }}
        >
          Удалить
        </Button>
      </Box>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={10000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'left', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ 
            width: '100%', 
            fontSize: '1.5rem', 
            bgcolor: 'rgba(255, 255, 255, 0.2)', 
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
            '& .MuiAlert-icon': {
              fontSize: '2.5rem', 
              color: snackbarSeverity === 'success' ? 'green' : 'red',
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteTournament;

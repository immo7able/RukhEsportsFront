import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 
import { getAllTeams } from '../../api/team';

const DeleteTeam = () => {
  const [id, setId] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllTeams();
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    try {
      await api.delete(`/admin/deleteTeam/${id}`);
      setSnackbarMessage('Команда удалена успешно!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при удалении команды!');
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
          color: '#FFFFFF'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Удаление команды
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
          <InputLabel id="team-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать команду</InputLabel>
          <Select
            labelId="team-select-label"
            value={selectedTeam}
            label="Выбрать команду"
            onChange={(e) => setSelectedTeam(e.target.value)}
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
            {teams.map((team) => (
              <MenuItem key={team.id} value={team.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
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

export default DeleteTeam;

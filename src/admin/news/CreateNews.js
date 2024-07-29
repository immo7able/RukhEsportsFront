import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api';
import { getTournaments } from '../../api/tournaments';

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [img, setImg] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUpl(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        setOpenSuccess(true);
      };
      reader.onerror = () => {
        setOpenError(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert('Пожалуйста, введите заголовок.');
      return;
    }
    if (!content) {
      alert('Пожалуйста, введите контент.');
      return;
    }
    if (!discipline) {
      alert('Пожалуйста, выберите дисциплину.');
      return;
    }
    if (!imgUpl) {
      alert('Пожалуйста, загрузите изображение.');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    formData.append('tournament', selectedTournament);

    try {
      await api.post('/admin/createNews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '1000px' }}>
      <TextField
        label="Заголовок"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
      />
      <TextField
        label="Контент"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
      />
      <FormControl fullWidth sx={{ width: '100%', justifyContent: 'space-between', mb: 2 }}>
        <InputLabel id="discipline-label" sx={{ fontSize: '1.5rem' }}>Дисциплина</InputLabel>
        <Select
          labelId="discipline-label"
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          label="Дисциплина"
          sx={{ fontSize: '1.5rem' }}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: '1.5rem',
              },
            },
          }}
        >
          <MenuItem value="PUBG" sx={{ fontSize: '1.5rem' }}>PUBG</MenuItem>
          <MenuItem value="HOK" sx={{ fontSize: '1.5rem' }}>HOK</MenuItem>
          <MenuItem value="MOB" sx={{ fontSize: '1.5rem' }}>MOB</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ width: '100%', justifyContent: 'space-between', mb: 2 }}>
        <InputLabel id="tournament-label" sx={{ fontSize: '1.5rem' }}>Турнир (необязательно)</InputLabel>
        <Select
          labelId="tournament-label"
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
          label="Турнир (необязательно)"
          sx={{ fontSize: '1.5rem' }}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: '1.5rem',
              },
            },
          }}
        >
          {tournaments.map((tournament) => (
            <MenuItem key={tournament.id} value={tournament.id} sx={{ fontSize: '1.5rem' }}>
              {tournament.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ width: '48%' }}
        >
          Загрузить изображение
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        <Button variant="contained" sx={{ width: '48%' }} onClick={handleSubmit}>Создать</Button>
      </Box>
      {img && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <img src={img} alt="uploaded" style={{ maxWidth: '100%' }} />
        </Box>
      )}
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Новость создана успешно!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Ошибка при создании новости!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateNews;

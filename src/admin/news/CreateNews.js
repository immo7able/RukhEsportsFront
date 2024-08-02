import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Typography } from '@mui/material';
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
  const [selectedTournament, setSelectedTournament] = useState(null);

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    if (selectedTournament !== null) {
      formData.append('tournament', selectedTournament);
    }
    try {
      await api.post('/admin/createNews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 4,
          maxWidth: '900px',
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#FFFFFF',
          overflow: 'auto',
          maxHeight: '700px',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Создание новости
        </Typography>
        <TextField
          label="Заголовок"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFFFFF',
          },
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF' },
            },
            '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          }}
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
          sx={{
            mb: 2,
            '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFFFFF',
          },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF' },
            },
            '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        <FormControl fullWidth sx={{
    mb: 2, width: '100%',
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
  }}>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                },
              },
            }}
          >
            <MenuItem value="PUBG" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>PUBG</MenuItem>
            <MenuItem value="HOK" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>HOK</MenuItem>
            <MenuItem value="MOB" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>MOB</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl fullWidth sx={{ mb: 2, width: '100%', justifyContent: 'space-between' }}>
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
        </FormControl> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              width: '48%',
              color: '#FFFFFF',
              borderColor: '#FFFFFF',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Загрузить изображение
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Button
            variant="contained"
            sx={{
              width: '48%',
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
            onClick={handleSubmit}
          >
            Создать
          </Button>
        </Box>
        {img && (
          <Box sx={{ textAlign: 'center', mt: 2, p: 1, border: '2px solid #FFFFFF', borderRadius: 2, display: 'inline-block' }}>
            <img src={img} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Box>
        )}
      </Box>
      <Snackbar
        open={openSuccess}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'left', horizontal: 'left' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '1.5rem',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
            '& .MuiAlert-icon': {
              fontSize: '2.5rem',
              color: 'green',
            },
          }}
        >
          Новость создана успешно! Нажмите на пустое пространство чтобы закрыть окно
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'left', horizontal: 'left' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{
            width: '100%',
            fontSize: '1.5rem',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
            '& .MuiAlert-icon': {
              fontSize: '2.5rem',
              color: 'red',
            },
          }}
        >
          Ошибка при создании новости! Проверьте загружено ли изображение и заполненность полей
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateNews;

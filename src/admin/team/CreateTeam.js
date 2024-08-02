import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Typography } from '@mui/material';
import api from '../../api/api'; 

const CreateTeam = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [img, setImg] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [rukhTeam, setRukhTeam] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUpl(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        setSnackbarMessage('Изображение успешно загружено!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      };
      reader.onerror = () => {
        setSnackbarMessage('Ошибка при загрузке изображения!');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('rukh', rukhTeam);
    formData.append('image', imgUpl);
    try {
      await api.post('/admin/createTeam', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSnackbarMessage('Команда создана успешно! Нажмите на пустое пространство чтобы закрыть окно');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при создании команды! Проверьте существует ли уже подобная команда и загружено ли изображение, заполненность полей');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
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
        Создание команды
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
          <InputLabel id="rukhTeam-label" sx={{ fontSize: '1.5rem' }}>Rukh Team</InputLabel>
          <Select
            labelId="rukhTeam-label"
            value={rukhTeam}
            onChange={(e) => setRukhTeam(e.target.value)}
            label="Rukh Team"
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
            <MenuItem value={false} sx={{ fontSize: '1.5rem' }}>Нет</MenuItem>
            <MenuItem value={true} sx={{ fontSize: '1.5rem' }}>Да</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Название"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {/* <TextField
          label="Контент"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        /> */}
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
            <MenuItem value="PUBG" sx={{ fontSize: '1.5rem' }}>PUBG</MenuItem>
            <MenuItem value="HOK" sx={{ fontSize: '1.5rem' }}>HOK</MenuItem>
            <MenuItem value="MOB" sx={{ fontSize: '1.5rem' }}>MOB</MenuItem>
          </Select>
        </FormControl>
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

export default CreateTeam;

import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
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
<Box sx={{ position: 'relative', p: 4,mt: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '900px', maxHeight: '700px', overflow: 'auto' }}>      
<FormControl fullWidth sx={{ mb: 2 }}>
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
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
      /> */}
      
      <FormControl fullWidth sx={{ mb: 2 }}>
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
      
      <Snackbar open={openSnackbar} autoHideDuration={10000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTeam;

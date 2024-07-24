import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 

const CreateTeam = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [img, setImg] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

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

  const handleClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    try {
      await api.post('/admin/createTeam', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Команда создана успешно!');
    } catch (error) {
      alert('Ошибка при создании команды!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto',  width: '80%', maxWidth: '900px' }}>
         <TextField
          label="Название"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      
      <FormControl fullWidth sx={{ mb: 2 }} >
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
        <MenuItem value="PUBG"  sx={{ fontSize: '1.5rem' }}>PUBG</MenuItem>
        <MenuItem value="HOK"  sx={{ fontSize: '1.5rem' }}>HOK</MenuItem>
        <MenuItem value="MOB"  sx={{ fontSize: '1.5rem' }}>MOB</MenuItem>
      </Select>
    </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

<Button
variant="contained"
component="label"
fullWidth
sx={{width: '48%' }}
>
Загрузить изображение
<input
type="file"
hidden
onChange={handleImageChange}
/>
</Button>

  <Button variant="contained" sx={{width: '48%' }}
 onClick={handleSubmit}>Создать</Button>
  </Box>
  {img && (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <img src={img} alt="uploaded" style={{ maxWidth: '100%' }} />
    </Box>
  )}
  <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      Изображение успешно загружено!
    </Alert>
  </Snackbar>
  <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      Ошибка при загрузке изображения!
    </Alert>
  </Snackbar>
      </Box>
  );
};

export default CreateTeam;

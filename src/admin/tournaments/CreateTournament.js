import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 

const CreateTournament = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [img, setImg] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [discipline, setDiscipline] = useState('');
  const [date, setDate] = useState('');
  const [prizepool, setPrizepool] = useState('');
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
      formData.append('status', status);
      formData.append('result', result);
      formData.append('date', date);
      formData.append('prizepool', prizepool);
    try {
      await api.post('/admin/createTournament', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      alert('Турнир создан успешно!');

    } catch (error) {
      alert('Ошибка при создании турнира!');
    }
  };

  return (
      <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '1000px' }}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

        <TextField
          label="Название"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl fullWidth sx={{ width: '48%' }}>
      <InputLabel id="status-label" sx={{ fontSize: '1.5rem' }}>Статус</InputLabel>
      <Select
        labelId="status-label"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        label="Статус"
        sx={{ fontSize: '1.5rem' }}
        MenuProps={{
          PaperProps: {
            style: {
              fontSize: '1.5rem',
            },
          },
        }}
      >
        <MenuItem value="Upcoming"  sx={{ fontSize: '1.5rem' }}>Upcoming</MenuItem>
        <MenuItem value="Ongoing"  sx={{ fontSize: '1.5rem' }}>Ongoing</MenuItem>
        <MenuItem value="Completed"  sx={{ fontSize: '1.5rem' }}>Completed</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ width: '48%' }} >
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
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

    <TextField
          label="Призовой фонд"
          fullWidth
          value={prizepool}
          onChange={(e) => setPrizepool(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        
        <TextField
          label="Результат"
          fullWidth
          value={result}
          onChange={(e) => setResult(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
          </Box>
       
        
        <TextField
          label="Контент"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2, mt: 2 }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
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
  
        <Button variant="contained"    sx={{ width: '48%' }} onClick={handleSubmit}>Создать</Button>
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

export default CreateTournament;

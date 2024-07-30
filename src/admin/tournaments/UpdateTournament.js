import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 
import { getTournaments } from '../../api/tournaments';

const UpdateTournament = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState('');
  const [img, setImg] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [discipline, setDiscipline] = useState('');
  const [date, setDate] = useState('');
  const [prizepool, setPrizepool] = useState('');
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
    const fetchImage = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        return file;
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        return null;
      }
    };
    if (selectedTournament) {
      const tournament = tournaments.find((item) => item.id === selectedTournament);
      if (tournament) {
        setId(tournament.id);
        setName(tournament.name);
        setContent(tournament.content);
        setStatus(tournament.status);
        setResult(tournament.result);
        setImg(tournament.img);
        fetchImage(tournament.img).then((file) => {
          if (file) {
            setImgUpl(file);
          }
        });
        setDiscipline(tournament.discipline.toUpperCase());
        setDate(tournament.date);
        setPrizepool(tournament.prizepool);
      }
    }
  }, [selectedTournament, tournaments]);

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
    formData.append('image', imgUpl);
    formData.append('status', status);
    formData.append('result', result);
    formData.append('date', date);
    formData.append('prizepool', prizepool);
    try {
      await api.put(`/admin/updateTournament/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSnackbarMessage('Турнир обновлен успешно! Нажмите на пустое пространство чтобы закрыть окно');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при обновлении турнира! Проверьте загружено ли изображение и заполненность полей');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
<Box sx={{ position: 'relative', p: 4,mt: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '900px', maxHeight: '700px', overflow: 'auto' }}>      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontSize: '2rem' }}>
        <FormControl fullWidth sx={{ width: '48%' }}>
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
                },
              },
            }}
          >
            {tournaments.map((tournament) => (
              <MenuItem key={tournament.id} value={tournament.id}>
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
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
          disabled
        />
      </Box>
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
            <MenuItem value="Upcoming" sx={{ fontSize: '1.5rem' }}>Upcoming</MenuItem>
            <MenuItem value="Ongoing" sx={{ fontSize: '1.5rem' }}>Ongoing</MenuItem>
            <MenuItem value="Completed" sx={{ fontSize: '1.5rem' }}>Completed</MenuItem>
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
            <MenuItem value="PUBG" sx={{ fontSize: '1.5rem' }}>PUBG</MenuItem>
            <MenuItem value="HOK" sx={{ fontSize: '1.5rem' }}>HOK</MenuItem>
            <MenuItem value="MOB" sx={{ fontSize: '1.5rem' }}>MOB</MenuItem>
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
          sx={{ width: '48%' }}
        >
          Загрузить изображение
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        <Button variant="contained" sx={{ width: '48%' }} onClick={handleSubmit}>Обновить</Button>
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

export default UpdateTournament;

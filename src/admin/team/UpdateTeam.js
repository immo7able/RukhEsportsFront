import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 
import { getTeams } from '../../api/team';

const UpdateTeam = () => {
  const [id, setId] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    fetchTeams();
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
    if (selectedTeam) {
      const team = teams.find((item) => item.id === selectedTeam);
      if (team) {
        setId(team.id);
        setName(team.name);
        setContent(team.content);
        setImg(team.img);
        fetchImage(team.img).then((file) => {
          if (file) {
            setImgUpl(file);
          }
        });
        setDiscipline(team.discipline.toUpperCase());
      }
    }
  }, [selectedTeam, teams]);

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
      await api.put(`/admin/updateTeam/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Команда обновлена успешно!');
    } catch (error) {
      alert('Ошибка при обновлении команды!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto',  width: '80%', maxWidth: '900px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="team-select-label"           sx={{ fontSize: '1.5rem' }}
        >Выбрать команду</InputLabel>
        <Select
          labelId="team-select-label"
          value={selectedTeam}
          label="Выбрать команду"
          sx={{ fontSize: '1.5rem', width: '90%' }}
          onChange={(e) => setSelectedTeam(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: '1.5rem',
              },
            },
          }}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
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
        sx={{ width: '48%' }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        disabled
      />
            </Box>

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
 onClick={handleSubmit}>Обновить</Button>
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

export default UpdateTeam;

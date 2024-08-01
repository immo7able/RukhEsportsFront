import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton, Snackbar, Alert } from '@mui/material';
import { getTeams } from '../../api/team';
import api from '../../api/api';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreatePlayer = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [discipline, setDiscipline] = useState('');
  const [rukhTeam, setRukhTeam] = useState(false); // Добавлено состояние rukhTeam

  const [socialMediaLinks, setSocialMediaLinks] = useState([{ platform: '', url: '' }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams(discipline);
        console.log('Полученные данные команд:', response.data); // Отладочная информация

        // Фильтрация команд по полю 'rukh'
        const filteredTeams = response.data.filter(team => team.rukh === rukhTeam);
        console.log('Отфильтрованные команды:', filteredTeams); // Отладочная информация

        setTeams(filteredTeams);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    fetchTeams();
  }, [discipline, rukhTeam]); // Добавлено rukhTeam в зависимости

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = socialMediaLinks.map((link, i) => (
      i === index ? { ...link, [field]: value } : link
    ));
    setSocialMediaLinks(updatedLinks);
  };

  const handleAddSocialMedia = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: '', url: '' }]);
  };

  const handleRemoveSocialMedia = (index) => {
    setSocialMediaLinks(socialMediaLinks.filter((_, i) => i !== index));
  };

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
    formData.append('nickname', nickname);
    formData.append('name', name);
    formData.append('content', content);
    formData.append('image', imgUpl);
    formData.append('team_id', teamId);
    formData.append('socialMediaLinks', JSON.stringify(socialMediaLinks));
    try {
      await api.post('/admin/createPlayer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSnackbarMessage('Игрок создан успешно! Нажмите на пустое пространство чтобы закрыть окно');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при создании игрока! Проверьте загружено ли изображение и заполненность полей');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, mt: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '900px', maxHeight: '700px', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <FormControl fullWidth sx={{ mb: 2, width: '48%' }}>
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
        <FormControl fullWidth sx={{ mb: 2, width: '48%' }}>
          <InputLabel id="team-select-label" sx={{ fontSize: '1.5rem' }}>Команда</InputLabel>
          <Select
            labelId="team-select-label"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            label="Команда"
            sx={{ fontSize: '1.5rem' }}
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
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Никнейм"
          fullWidth
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        <TextField
          label="Имя"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        sx={{ mb: 2 }}
      />

      

      
      <Box>
  {socialMediaLinks.map((link, index) => (
    rukhTeam && (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ mr: 2, width: '30%' }}>
          <InputLabel id={`platform-label-${index}`} sx={{ fontSize: '1.5rem' }}>Платформа</InputLabel>
          <Select
            labelId={`platform-label-${index}`}
            value={link.platform}
            onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
            label="Платформа"
            sx={{ fontSize: '1.5rem' }}
          >
            <MenuItem value="YouTube" sx={{ fontSize: '1.5rem' }}>YouTube</MenuItem>
            <MenuItem value="Instagram" sx={{ fontSize: '1.5rem' }}>Instagram</MenuItem>
            <MenuItem value="Twitch" sx={{ fontSize: '1.5rem' }}>Twitch</MenuItem>
            <MenuItem value="Facebook" sx={{ fontSize: '1.5rem' }}>Facebook</MenuItem>
            <MenuItem value="Other" sx={{ fontSize: '1.5rem' }}>Другое</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="URL"
          value={link.url}
          onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
          sx={{ flex: 1 }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        <IconButton onClick={() => handleRemoveSocialMedia(index)} sx={{ ml: 2 }}>
          <RemoveIcon />
        </IconButton>
      </Box>
    )
  ))}
  {rukhTeam && (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Button onClick={handleAddSocialMedia} startIcon={<AddIcon />} sx={{ border: 1, width: '100%' }}>Добавить соцсеть</Button>
    </Box>
  )}
</Box>



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

export default CreatePlayer;

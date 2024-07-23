import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton, Snackbar, Alert } from '@mui/material';
import { getTeam } from '../../api/team';
import api from '../../api/api';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreatePlayer = ({}) => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teams, setTeams] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([{ platform: '', url: '' }]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeam();
        setTeams(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    fetchTeams();
  }, []);

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
    try {
      await api.post('/players', { nickname, name, content, img, fk_team: teamId, socialMediaLinks });
      alert('Игрок создан успешно!');
    } catch (error) {
      alert('Ошибка при создании игрока!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto',  width: '80%', maxWidth: '900px' }}>
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
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>

      <FormControl fullWidth sx={{ mb: 2,  width: '48%' }}>
        <InputLabel id="team-select-label"   sx={{ fontSize: '1.5rem' }}>Команда</InputLabel>
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

      <Button onClick={handleAddSocialMedia} startIcon={<AddIcon />}         sx={{ border: 1, width: '48%' }}
      >Добавить соцсеть</Button>
      </Box>


      {socialMediaLinks.map((link, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ mr: 2, width: '30%' }}>
          <InputLabel id={`platform-label-${index}`}         sx={{ fontSize: '1.5rem' }}
          >Платформа</InputLabel>
          <Select
            labelId={`platform-label-${index}`}
            value={link.platform}
            onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
            label="Платформа"
            sx={{ fontSize: '1.5rem' }}

          >
            <MenuItem value="YouTube"           sx={{ fontSize: '1.5rem' }}
            >YouTube</MenuItem>
            <MenuItem value="Instagram"           sx={{ fontSize: '1.5rem' }}
            >Instagram</MenuItem>
            <MenuItem value="Twitch"           sx={{ fontSize: '1.5rem' }}
            >Twitch</MenuItem>
            <MenuItem value="Facebook"           sx={{ fontSize: '1.5rem' }}
            >Facebook</MenuItem>
            <MenuItem value="Other"           sx={{ fontSize: '1.5rem' }}
            >Другое</MenuItem>
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
      
      ))}
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

export default CreatePlayer;

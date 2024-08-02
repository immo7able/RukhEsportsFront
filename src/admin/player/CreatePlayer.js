import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton, Snackbar, Alert, Typography } from '@mui/material';
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
  const [rukhTeam, setRukhTeam] = useState(false);

  const [socialMediaLinks, setSocialMediaLinks] = useState([{ platform: '', url: '' }]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams(discipline);
        const filteredTeams = response.data.filter(team => team.rukh === rukhTeam);
        setTeams(filteredTeams);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    fetchTeams();
  }, [discipline, rukhTeam]);

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
          flexDirection: 'column',
          alignItems: 'center',
          color: '#FFFFFF',
          overflow: 'auto',
          maxHeight: '700px',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Создание игрока
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
          <FormControl fullWidth sx={{
            mb: 2,
            width: '48%',
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
          <FormControl fullWidth sx={{
            mb: 2,
            width: '48%',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                  },
                },
              }}
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
          <TextField
            label="Никнейм"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            sx={{
              width: '48%',
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
          <TextField
            label="Имя"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: '48%',
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
        </Box>
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
        <Box>
          {socialMediaLinks.map((link, index) => (
            rukhTeam && (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FormControl
  sx={{
    mr: 2,
    width: '30%',
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
  }}
>
  <InputLabel id={`platform-label-${index}`} sx={{ fontSize: '1.5rem' }}>Платформа</InputLabel>
  <Select
    labelId={`platform-label-${index}`}
    value={link.platform}
    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
    label="Платформа"
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
                  sx={{
                    flex: 1,
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
                <IconButton onClick={() => handleRemoveSocialMedia(index)} sx={{ ml: 2 }}>
                  <RemoveIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
              </Box>
            )
          ))}
          {rukhTeam && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button onClick={handleAddSocialMedia} startIcon={<AddIcon />} sx={{
                border: 1,
                width: '100%',
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                textTransform: 'none',
                fontSize: '1.5rem',
                '&:hover': {
                  borderColor: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}>Добавить соцсеть</Button>
            </Box>
          )}
        </Box>
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

export default CreatePlayer;

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api';
import { getTournaments } from '../../api/tournaments';
import { getTeams } from '../../api/team';

const CreateMatch = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [img, setImg] = useState(null);
  const [imgUpl, setImgUpl] = useState(null);
  const [tournamentId, setTournamentId] = useState('');
  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
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
    if (discipline) {
      const fetchTeams = async () => {
        try {
          const response = await getTeams(discipline);
          setTeams(response.data);
        } catch (error) {
          console.error('Ошибка при загрузке команд:', error);
        }
      };

      fetchTeams();
    }
  }, [discipline]);

  const handleTournamentChange = (e) => {
    const selectedTournamentId = e.target.value;
    const selectedTournament = tournaments.find(tournament => tournament.id === selectedTournamentId);
    if (selectedTournament) {
      setTournamentId(selectedTournamentId);
      setDiscipline(selectedTournament.discipline);
    }
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
    formData.append('title', title);
    formData.append('date', date);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    formData.append('result', result);
    formData.append('status', status);
    formData.append('youtubeUrl', youtubeUrl);
    formData.append('tournamentId', tournamentId);
    formData.append('team1Id', team1Id);
    formData.append('team2Id', team2Id);
    try {
      await api.post('/admin/createMatch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSnackbarMessage('Матч создан успешно! Нажмите на пустое пространство чтобы закрыть окно');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Ошибка при создании матча! Проверьте загружено ли изображение и заполненность полей');
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
        <FormControl fullWidth sx={{
          width: '48%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
          '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          '& .MuiSvgIcon-root': { color: '#FFFFFF' },
        }}>
          <InputLabel id="tournament-select-label" sx={{ fontSize: '1.5rem' }}>Какой турнир</InputLabel>
          <Select
            labelId="tournament-select-label"
            value={tournamentId}
            onChange={handleTournamentChange}
            label="Какой турнир"
            sx={{ fontSize: '1.5rem' }}
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }
              }
            }}
          >
            {tournaments.map((tournament) => (
              <MenuItem key={tournament.id} value={tournament.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
                {tournament.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Название"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            width: '48%',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF' },
            },
            '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
            '& .MuiSvgIcon-root': { color: '#FFFFFF' },
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
        <FormControl fullWidth sx={{
          width: '48%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
          '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          '& .MuiSvgIcon-root': { color: '#FFFFFF' },
        }}>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }
              }
            }}
          >
            <MenuItem value="Upcoming" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>Upcoming</MenuItem>
            <MenuItem value="Ongoing" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>Ongoing</MenuItem>
            <MenuItem value="Completed" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{
            width: '48%',
            '& .MuiInputLabel-root': { color: '#FFFFFF' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF', backgroundColor: 'transparent', caretColor: '#FFFFFF' }
            },
            '& .MuiInputBase-root': {
              '& input[type="date"]::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
              },
              '& input[type="date"]': {
                color: '#FFFFFF',
                '&::-webkit-clear-button, &::-webkit-inner-spin-button': {
                  display: 'none',
                },
                '&::-webkit-datetime-edit-year-field, &::-webkit-datetime-edit-month-field, &::-webkit-datetime-edit-day-field': {
                  color: '#FFFFFF',
                  background: 'transparent',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                },
                '&:hover': {
                  outline: 'none',
                  boxShadow: 'none',
                },
                '&:active': {
                  outline: 'none',
                  boxShadow: 'none',
                },
                '&:disabled': {
                  outline: 'none',
                  boxShadow: 'none',
                },
                '&:read-only': {
                  outline: 'none',
                  boxShadow: 'none',
                },
              }
            }
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
      </Box>
      <TextField
        label="YouTube URL"
        fullWidth
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        sx={{
          mb: 2,
          mt: 2,
          '& .MuiInputLabel-root': {
            color: '#FFFFFF',
            fontSize: '1.5rem',
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' }
          }
        }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 2, width: '100%' }}>
        <FormControl fullWidth sx={{
          width: '48%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
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
            disabled
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }
              }
            }}
          >
            <MenuItem value="pubg" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>PUBG</MenuItem>
            <MenuItem value="hok" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>HOK</MenuItem>
            <MenuItem value="mob" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>MOB</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Результат"
          fullWidth
          value={result}
          onChange={(e) => setResult(e.target.value)}
          sx={{
            width: '48%',
            '& .MuiInputLabel-root': {
              color: '#FFFFFF',
              fontSize: '1.5rem',
            },
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#FFFFFF' },
              '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
              '& .MuiInputBase-input': { color: '#FFFFFF' }
            }
          }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
        <FormControl fullWidth sx={{
          width: '48%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
          '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          '& .MuiSvgIcon-root': { color: '#FFFFFF' },
        }}>
          <InputLabel id="team1-select-label" sx={{ fontSize: '1.5rem' }}>Команда 1</InputLabel>
          <Select
            labelId="team1-select-label"
            value={team1Id}
            onChange={(e) => setTeam1Id(e.target.value)}
            label="Команда 1"
            sx={{ fontSize: '1.5rem' }}
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }
              }
            }}
          >
            {teams.filter(team => team.id !== team2Id).map((team) => (
              <MenuItem key={team.id} value={team.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{
          width: '48%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: '#FFFFFF' },
            '&.Mui-focused fieldset': { borderColor: '#FFFFFF' },
            '& .MuiInputBase-input': { color: '#FFFFFF' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FFFFFF' },
          '& .MuiInputLabel-root': { color: '#FFFFFF', fontSize: '1.5rem' },
          '& .MuiSvgIcon-root': { color: '#FFFFFF' },
        }}>
          <InputLabel id="team2-select-label" sx={{ fontSize: '1.5rem' }}>Команда 2</InputLabel>
          <Select
            labelId="team2-select-label"
            value={team2Id}
            onChange={(e) => setTeam2Id(e.target.value)}
            label="Команда 2"
            sx={{ fontSize: '1.5rem' }}
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF'
                }
              }
            }}
          >
            {teams.filter(team => team.id !== team1Id).map((team) => (
              <MenuItem key={team.id} value={team.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default CreateMatch;

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api'; 
import { getTournaments } from '../../api/tournaments';
import { getTeams } from '../../api/team';
import {getAllMatches} from '../../api/matches';

const UpdateMatch = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [img, setImg] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);


  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
        setTournaments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке турниров:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await getTeams(discipline);
        setTeams(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке команд:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await getAllMatches();
        setMatches(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке матчей:', error);
      }
    };

    fetchTournaments();
    fetchTeams();
    fetchMatches();
  }, [discipline]);


  useEffect(() => {
    if (selectedMatch) {
      const match = matches.find((item) => item.id === selectedMatch);
      console.log(match);
      if (match) {
        setId(match.id);
        setTitle(match.title);
        setDate(match.date);
        setResult(match.result);
        setStatus(match.status);
        setYoutubeUrl(match.youtubeUrl);
        setDiscipline(match.discipline.toUpperCase());
        setImg(match.img);
        setTournamentId(match.tournament.id);
        setTeam1Id(match.team1.id);
        setTeam2Id(match.team2.id);
      }
    }
  }, [selectedMatch, matches]);

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
      await api.put(`/matches/${id}`, { title, date, result, status, youtubeUrl, discipline, img, fk_tournament: tournamentId });

      await api.delete(`/match_team/${id}`);
      await api.post('/match_team', { match_id: id, team_id: team1Id });
      await api.post('/match_team', { match_id: id, team_id: team2Id });

      alert('Матч обновлен успешно!');
    } catch (error) {
      alert('Ошибка при обновлении матча!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto',  width: '80%', maxWidth: '900px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
       <FormControl fullWidth sx={{ width: '48%' }}>
        <InputLabel id="match-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать матч</InputLabel>
        <Select
          labelId="match-select-label"
          value={selectedMatch}
          label="Выбрать матч"
          sx={{ fontSize: '1.5rem' }}
          onChange={(e) => setSelectedMatch(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                fontSize: '1.5rem',
              },
            },
          }}
        >
          {matches.map((match) => (
            <MenuItem key={match.id} value={match.id}>
              {match.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl >
      <TextField
        label="ID матча"
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />
        <TextField
          type="datetime-local"
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
  
  <TextField
    label="YouTube URL"
    fullWidth
    value={youtubeUrl}
    onChange={(e) => setYoutubeUrl(e.target.value)}
    sx={{ mt: 2 }}
    InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
  />
  
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 2 }}>
    <FormControl sx={{ width: '48%' }}>
      <InputLabel id="tournament-select-label" sx={{ fontSize: '1.5rem' }}>Турнир</InputLabel>
      <Select
        labelId="tournament-select-label"
        value={tournamentId}
        onChange={(e) => setTournamentId(e.target.value)}
        label="Турнир"
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
          label="Результат"
          fullWidth
          value={result}
          onChange={(e) => setResult(e.target.value)}
          sx={{ width: '48%' }}
          InputLabelProps={{ style: { fontSize: '1.5rem' } }}
          InputProps={{ style: { fontSize: '1.5rem' } }}
        />

   
  </Box>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <FormControl sx={{ width: '48%'}}>
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
    <FormControl sx={{ width: '48%' }}>
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

export default UpdateMatch;

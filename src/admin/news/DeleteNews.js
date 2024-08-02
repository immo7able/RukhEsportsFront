import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Alert, Snackbar } from '@mui/material';
import api from '../../api/api';
import { getNews } from '../../api/news';

const DeleteNews = () => {
  const [id, setId] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await getNews();
        setNewsItems(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };
    fetchNewsItems();
  }, []);

  useEffect(() => {
    if (selectedNews) {
      const news = newsItems.find((item) => item.id === selectedNews);
      if (news) {
        setId(news.id);
      }
    }
  }, [selectedNews, newsItems]);

  const handleSnackbarClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async () => {
    try {
      await api.delete(`/admin/deleteNews/${id}`);
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  const filteredNews = newsItems.filter(newsItem =>
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Box
      sx={{
        p: 4,
        maxWidth: '500px',
        mx: 'auto',
        my: '10%',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFFFF',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Удаление новости
      </Typography>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск по новостям"
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
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
      <FormControl fullWidth sx={{
        mb: 2,
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
        <InputLabel id="news-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать новость</InputLabel>
        <Select
          labelId="news-select-label"
          value={selectedNews}
          label="Выбрать новость"
          onChange={(e) => setSelectedNews(e.target.value)}
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
          {filteredNews.map((news) => (
            <MenuItem key={news.id} value={news.id} sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
              {news.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="ID новости"
        fullWidth
        value={id}
        onChange={(e) => setId(e.target.value)}
        sx={{
          mb: 2,
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
        disabled
      />
      <Button
        variant="contained"
        sx={{
          width: '100%',
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
        Удалить
      </Button>
    </Box>
    <Snackbar
    open={openSuccess}
    autoHideDuration={10000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'left', horizontal: 'left' }}
  >
    <Alert
      onClose={handleSnackbarClose}
      severity="success"
      sx={{
        width: '100%',
        fontSize: '1.5rem',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        color: '#FFFFFF',
        backdropFilter: 'blur(10px)',
        '& .MuiAlert-icon': {
          fontSize: '2.5rem',
          color: 'green',
        },
      }}
    >
      Новость удалена успешно! Нажмите на пустое пространство чтобы закрыть окно
    </Alert>
  </Snackbar>
  <Snackbar
    open={openError}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'left', horizontal: 'left' }}
  >
    <Alert
      onClose={handleSnackbarClose}
      severity="error"
      sx={{
        width: '100%',
        fontSize: '1.5rem',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        color: '#FFFFFF',
        backdropFilter: 'blur(10px)',
        '& .MuiAlert-icon': {
          fontSize: '2.5rem',
          color: 'red',
        },
      }}
    >
      Ошибка при удалении новости! Проверьте загружено ли изображение и заполненность полей
    </Alert>
  </Snackbar>
  </>
  );
};

export default DeleteNews;

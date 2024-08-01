import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import api from '../../api/api';
import { getNews } from '../../api/news';

const UpdateNews = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [img, setImg] = useState('');
  const [imgUpl, setImgUpl] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (selectedNews) {
      const news = newsItems.find((item) => item.id === selectedNews);
      if (news) {
        setId(news.id);
        setTitle(news.title);
        setContent(news.content);
        setDiscipline(news.category.toUpperCase());
        fetchImage(news.image).then((file) => {
          if (file) {
            setImgUpl(file);
          }
        });
        setImg(news.image);
      }
    }
  }, [selectedNews, newsItems]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUpl(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.onerror = () => {
        setOpenError(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert('Пожалуйста, введите заголовок.');
      return;
    }
    if (!content) {
      alert('Пожалуйста, введите контент.');
      return;
    }
    if (!discipline) {
      alert('Пожалуйста, выберите дисциплину.');
      return;
    }
    if (!imgUpl) {
      alert('Пожалуйста, загрузите изображение.');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    try {
      await api.put(`/admin/updateNews/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setOpenSuccess(true);
    } catch (error) {
      setOpenError(true);
    }
  };

  const filteredNews = newsItems.filter(newsItem => 
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ position: 'relative', p: 4, mt: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', width: '80%', maxWidth: '900px', maxHeight: '700px', overflow: 'auto' }}>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Начните вводить название новости, чтобы отфильтровать "
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="news-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать новость из общего списка</InputLabel>
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
              },
            },
          }}
        >
          {filteredNews.map((news) => (
            <MenuItem key={news.id} value={news.id}>
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
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { fontSize: '1.5rem' } }}
        InputProps={{ style: { fontSize: '1.5rem' } }}
        disabled
      />
      <TextField
        label="Заголовок"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
      <FormControl fullWidth sx={{ mb: 2 }}>
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
      <Snackbar open={openSuccess} autoHideDuration={10000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Новость обновлена успешно! Нажмите на пустое пространство чтобы закрыть окно
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Ошибка при создании новости!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateNews;

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Typography } from '@mui/material';
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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('discipline', discipline);
    formData.append('image', imgUpl);
    try {
      await api.put(`/admin/updateNews/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
        Обновление новости
      </Typography>
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Начните вводить название новости, чтобы отфильтровать "
          variant="outlined"
          fullWidth
          sx={{
            mb: 3,
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
          <InputLabel id="news-select-label" sx={{ fontSize: '1.5rem' }}>Выбрать новость из общего списка</InputLabel>
          <Select
            labelId="news-select-label"
            value={selectedNews}
            label="Выбрать новость из общего списка"
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
        <TextField
          label="Заголовок"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                },
              },
            }}
          >
            <MenuItem value="PUBG" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>PUBG</MenuItem>
            <MenuItem value="HOK" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>HOK</MenuItem>
            <MenuItem value="MOB" sx={{ fontSize: '1.5rem', '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>MOB</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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
            Обновить
          </Button>
        </Box>
        {img && (
          <Box sx={{ textAlign: 'center', mt: 2, p: 1, border: '2px solid #FFFFFF', borderRadius: 2, display: 'inline-block' }}>
            <img src={img} alt="uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Box>
        )}
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
          Новость обновлена успешно! Нажмите на пустое пространство чтобы закрыть окно
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
          Ошибка при обновлении новости! Проверьте загружено ли изображение и заполненность полей
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateNews;

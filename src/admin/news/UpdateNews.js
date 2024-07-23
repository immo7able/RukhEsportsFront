import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert} from '@mui/material';
import api from '../../api/api';
import { getNewsItem } from '../../api/news';

const UpdateNews = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [img, setImg] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await getNewsItem();
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
        setTitle(news.title);
        setContent(news.content);
        setDiscipline(news.discipline);
        setImg(news.img);
      }
    }
  }, [selectedNews, newsItems]);


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
      await api.put(`/news/${id}`, { title, content, discipline, img });
      alert('Новость обновлена успешно!');
    } catch (error) {
      alert('Ошибка при обновлении новости!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto',  width: '80%', maxWidth: '1000px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="news-select-label"           sx={{ fontSize: '1.5rem' }}
        >Выбрать новость</InputLabel>
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
          {newsItems.map((news) => (
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
      <FormControl fullWidth sx={{ width: '100%' , justifyContent: 'space-between', mb: 2 }} >
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

 <Button variant="contained"    sx={{ width: '48%' }} onClick={handleSubmit}>Обновить</Button>
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

export default UpdateNews;

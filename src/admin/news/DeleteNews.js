import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../api/api';
import { getNewsItem } from '../../api/news';

const DeleteNews = () => {
  const [id, setId] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState('');

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
      }
    }
  }, [selectedNews, newsItems]);

  const handleSubmit = async () => {
    try {
      await api.delete(`/news/${id}`);
      alert('Новость удалена успешно!');
    } catch (error) {
      alert('Ошибка при удалении новости!');
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 4, bgcolor: 'background.paper', borderRadius: 1, mx: 'auto', my: '20%', width: '80%', maxWidth: '500px' }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="news-select-label">Выбрать новость</InputLabel>
        <Select
          labelId="news-select-label"
          value={selectedNews}
          label="Выбрать новость"
          onChange={(e) => setSelectedNews(e.target.value)}
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
        disabled
      />
      <Button variant="contained" onClick={handleSubmit}>Удалить</Button>
    </Box>
  );
};

export default DeleteNews;

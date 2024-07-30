import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { getTopImage, uploadImage } from '../api/imageApi'; 

const CoverManagement = () => {
  const [page, setPage] = useState('news');
  const [selectedTab, setSelectedTab] = useState('pubg');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const imgUrl = await getTopImage(page, selectedTab);
      setCurrentImage(imgUrl.data.img);
    };
    fetchImage();
  }, [page, selectedTab]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('page', page);
      formData.append('tab', selectedTab);

      try {
        console.log('Отправка данных:', { file: image.name, page, selectedTab });
        const response = await uploadImage(formData);
        alert('Обложка обновлена успешно!');
        console.log('Ответ сервера:', response);
      } catch (error) {
        console.error('Ошибка при загрузке обложки!', error);
        alert(`Ошибка при загрузке обложки! Сообщение: ${error.message}`);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="page-select-label">Страница</InputLabel>
        <Select
          labelId="page-select-label"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          label="Страница"
        >
          <MenuItem value="news">Новости</MenuItem>
          <MenuItem value="tournaments">Турниры</MenuItem>
          <MenuItem value="teams">Команды и игроки</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="tab-select-label">Вкладка</InputLabel>
        <Select
          labelId="tab-select-label"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          label="Вкладка"
        >
          <MenuItem value="pubg">PUBG</MenuItem>
          <MenuItem value="hok">HOK</MenuItem>
          <MenuItem value="mob">MOB</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mb: 2 }}>
        <Typography>Текущая обложка:</Typography>
        {currentImage && <img src={currentImage} alt="Current cover" style={{ maxWidth: '100%' }} />}
      </Box>
      <Input
        type="file"
        onChange={handleFileChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Загрузить новую обложку
      </Button>
    </Box>
  );
};

export default CoverManagement;

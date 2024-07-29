import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input } from '@mui/material';
import { getSliderImage, uploadSliderImage } from '../api/slider'; 

const CarouselManagement = () => {
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const imgUrl = await getSliderImage();
      setCurrentImage(imgUrl);
    };
    fetchImage();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        console.log('Отправка данных:', formData);
        const response = await uploadSliderImage(formData);
        alert('Обложка карусели обновлена успешно!');
        console.log('Ответ сервера:', response);
      } catch (error) {
        console.error('Ошибка при загрузке обложки карусели!', error);
        alert(`Ошибка при загрузке обложки карусели! Сообщение: ${error.message}`);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography>Текущая обложка карусели:</Typography>
        {currentImage && <img src={currentImage} alt="Current slider cover" style={{ maxWidth: '100%' }} />}
      </Box>
      <Input
        type="file"
        onChange={handleFileChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Загрузить новую обложку карусели
      </Button>
    </Box>
  );
};

export default CarouselManagement;

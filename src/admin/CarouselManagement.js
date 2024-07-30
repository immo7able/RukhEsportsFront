import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input, Snackbar, Alert } from '@mui/material';
import { getSliderImage, uploadSliderImage } from '../api/slider'; 

const CarouselManagement = () => {
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgUrl = await getSliderImage();
        if (imgUrl && imgUrl.data && imgUrl.data.img) {
          setCurrentImage(imgUrl.data.img);
        } else {
          console.error('Image data is not available:', imgUrl);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    fetchImage();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        console.log('Отправка данных:', formData);
        const response = await uploadSliderImage(formData);
        setSnackbarMessage('Обложка карусели обновлена успешно! Нажмите на пустое пространство чтобы закрыть окно');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        console.log('Ответ сервера:', response);
      } catch (error) {
        console.error('Ошибка при загрузке обложки карусели!', error);
        setSnackbarMessage(`Ошибка при загрузке обложки карусели! Сообщение: ${error.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Управление обложкой карусели
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Текущая обложка карусели:</Typography>
        {currentImage ? (
          <img src={currentImage} alt="Current slider cover" style={{ width: '100%', borderRadius: '8px' }} />
        ) : (
          <Typography variant="body2" color="textSecondary">Обложка отсутствует</Typography>
        )}
      </Box>
      <Input
        type="file"
        onChange={handleFileChange}
        sx={{ mb: 2, display: 'block' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Загрузить новую обложку карусели
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CarouselManagement;

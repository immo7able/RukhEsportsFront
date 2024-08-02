import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input, Snackbar, Alert } from '@mui/material';
import { getSliderImage, uploadSliderImage } from '../api/slider'; 

const CarouselManagement = () => {
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  useEffect(() => {
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
        setSnackbarMessage('Обложка карусели обновлена успешно! Проверьте на главной странице');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        console.log('Ответ сервера:', response);

        fetchImage();
      } catch (error) {
        console.error('Ошибка при загрузке обложки карусели!', error);
        setSnackbarMessage(`Ошибка при загрузке обложки карусели! Сообщение: ${error.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <>
    <Box
      sx={{
        p: 4,
        maxWidth: '800px',
        mx: 'auto',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFFFF'
      }}
    >
      
      <Box sx={{ mb: 3, width: '100%', textAlign: 'center' }}>
        <Typography variant="h6">Текущая обложка карусели:</Typography>
        {currentImage ? (
          <Box
            sx={{
              mt: 2,
              p: 1,
              border: '2px solid #FFFFFF',
              borderRadius: 2,
              display: 'inline-block'
            }}
          >
            <img src={currentImage} alt="Current slider cover" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        ) : (
          <Typography variant="body2">Обложка отсутствует</Typography>
        )}
      </Box>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <Button
        variant="outlined"
        component="label"
        sx={{
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
        Выберите файл
        <Input
          type="file"
          onChange={handleFileChange}
          sx={{ display: 'none' }}
        />
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: '#FFFFFF',
          fontWeight: 'bold',
          textTransform: 'none',
          borderRadius: 2,
          px: 4,
          py: 1,
          transition: '0.3s',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
          },
        }}
      >
        Загрузить новую обложку
      </Button>
    </Box>

      
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
          }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CarouselManagement;

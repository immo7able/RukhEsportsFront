import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Input, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { getTopImage, uploadImage } from '../api/imageApi'; 

const CoverManagement = () => {
  const [page, setPage] = useState('news');
  const [selectedTab, setSelectedTab] = useState('pubg');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgUrl = await getTopImage(page, selectedTab);
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
  }, [page, selectedTab]);
  
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
      formData.append('page', page);
      formData.append('tab', selectedTab);

      try {
        console.log('Отправка данных:', { file: image.name, page, selectedTab });
        const response = await uploadImage(formData);
        setSnackbarMessage('Обложка обновлена успешно! Нажмите на пустое пространство чтобы закрыть окно');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        console.log('Ответ сервера:', response);
      } catch (error) {
        console.error('Ошибка при загрузке обложки!', error);
        setSnackbarMessage(`Ошибка при загрузке обложки! Сообщение: ${error.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Управление обложками
      </Typography>
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
          <MenuItem value="matches">Матчи</MenuItem>
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
        <Typography variant="subtitle1">Текущая обложка:</Typography>
        {currentImage ? (
          <img src={currentImage} alt="Current cover" style={{ width: '100%', borderRadius: '8px' }} />
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
        Загрузить новую обложку
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoverManagement;

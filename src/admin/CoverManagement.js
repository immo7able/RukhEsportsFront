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
      <FormControl fullWidth sx={{ mb: 3, '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFFFFF',
          },'& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#FFFFFF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',
            },
            '& .MuiInputBase-input': {
              color: '#FFFFFF',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#FFFFFF',
          },
          '& .MuiSvgIcon-root': {
            color: '#FFFFFF',
          } }}>
        <InputLabel id="page-select-label" sx={{ color: '#FFFFFF' }}>Страница</InputLabel>
        <Select
          labelId="page-select-label"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          label="Страница"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFFFFF',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFFFFF',
            },
            '& .MuiSelect-icon': {
              color: '#FFFFFF',
            },
            '& .MuiSelect-select': {
              color: '#FFFFFF',
            },
          }}
          MenuProps={{
            PaperProps: { style: { fontSize: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.2)',  backdropFilter: 'blur(10px)', color: '#FFFFFF' } }
          }}
        >
          <MenuItem value="news">Новости</MenuItem>
          <MenuItem value="tournaments">Турниры</MenuItem>
          <MenuItem value="teams">Команды и игроки</MenuItem>
          <MenuItem value="matches">Матчи</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3, '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFFFFF',
          },'& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#FFFFFF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',
            },
            '& .MuiInputBase-input': {
              color: '#FFFFFF',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#FFFFFF',
          },
          '& .MuiSvgIcon-root': {
            color: '#FFFFFF',
          } }}>
        <InputLabel id="tab-select-label" sx={{ color: '#FFFFFF' }}>Вкладка</InputLabel>
        <Select
          labelId="tab-select-label"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          label="Вкладка"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFFFFF',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFFFFF',
            },
            '& .MuiSelect-icon': {
              color: '#FFFFFF',
            },
            '& .MuiSelect-select': {
              color: '#FFFFFF',
            },
          }}
          MenuProps={{
            PaperProps: { style: { fontSize: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.2)',  backdropFilter: 'blur(10px)', color: '#FFFFFF' } }
          }}
        >
          <MenuItem value="pubg">PUBG</MenuItem>
          <MenuItem value="hok">HOK</MenuItem>
          <MenuItem value="mob">MOB</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mb: 3, width: '100%', textAlign: 'center' }}>
        <Typography variant="h6">Текущая обложка:</Typography>
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
            <img src={currentImage} alt="Current cover" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        ) : (
          <Typography variant="body2">Обложка отсутствует</Typography>
        )}
      </Box>
      <Button
        variant="outlined"
        component="label"
        sx={{
          color: '#FFFFFF',
          borderColor: '#FFFFFF',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 'bold',
          mb: 2,
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

export default CoverManagement;

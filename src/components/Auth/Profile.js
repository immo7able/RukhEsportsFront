import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { getProfile, updateEmail, updatePassword, updateNickname, uploadProfileImage } from '../../api/profile';
import { logout } from '../../api/auth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/blur.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20px',
  width: '100%',
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(23,54,50,0.65)',
  padding: '40px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '300px',
  },
}));

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setEmail(data.email);
        setNickname(data.nickname || '');
        setProfileImage(data.profileImage || '');
      } catch (error) {
        setError('Ошибка при загрузке данных профиля');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(email);
    } catch (error) {
      setError('Ошибка при обновлении email');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(password);
    } catch (error) {
      setError('Ошибка при обновлении пароля');
    }
  };

  const handleSaveNickname = async () => {
    try {
      await updateNickname(nickname);
    } catch (error) {
      setError('Ошибка при сохранении никнейма');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      setError('Ошибка при выходе');
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      try {
        const { data } = await uploadProfileImage(formData);
        setProfileImage(data.profileImage);
      } catch (error) {
        setError('Ошибка при загрузке изображения профиля');
      }
    }
  };

  return (
    <StyledContainer>
      <FormBox>

        {error && <Typography color="rgb(220, 20, 60)" variant="h6">{error}</Typography>}
         <Box display="flex" alignItems="center" marginBottom={2}>
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: 'rgb(220, 20, 60, 0.8)', 
            borderRadius: '50%', 
            color: '#fff', 
            width: 50, 
            height: 50, 
            minWidth: 'auto', 
            '&:hover': { backgroundColor: '#cc0000' }, 
            marginRight: 4 
          }}
          onClick={handleLogout}
        >
          <LogoutIcon sx={{ marginLeft: 1 }} />
        </Button>
        <Avatar
          src={profileImage}
          alt="Profile Image"
          sx={{ width: 150, height: 150, marginRight: 4 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ 
            backgroundColor: '#008e82', 
            borderRadius: '50%', 
            color: '#fff', 
            width: 50, 
            height: 50, 
            minWidth: 'auto', 
            '&:hover': { backgroundColor: '#006f69' } 
          }}
        >
          <UploadFileIcon />
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.size > 1024 * 1024) {
                  setError('Размер превышает 1 мб');
                  setTimeout(() => setError(''), 5000);
                } else {
                  handleProfileImageChange(e);
                }
              }
            }}
          />
        </Button>
      </Box>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: '#008e82' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#008e82' },
              '&:hover fieldset': { borderColor: '#008e82' },
              '&.Mui-focused fieldset': { borderColor: '#008e82' },
            },
            input: { color: '#008e82' },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, borderRadius:'50px', backgroundColor: '#008e82', color: '#fff', '&:hover': { backgroundColor: '#006f69' } }}
          onClick={handleUpdateEmail}
        >
          Изменить Email
        </Button>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: '#008e82' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#008e82' },
              '&:hover fieldset': { borderColor: '#008e82' },
              '&.Mui-focused fieldset': { borderColor: '#008e82' },
            },
            input: { color: '#008e82' },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, borderRadius:'50px', backgroundColor: '#008e82', color: '#fff', '&:hover': { backgroundColor: '#006f69' } }}
          onClick={handleUpdatePassword}
        >
          Изменить Пароль
        </Button>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="nickname"
          label="Никнейм"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          InputLabelProps={{ style: { color: '#008e82' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#008e82' },
              '&:hover fieldset': { borderColor: '#008e82' },
              '&.Mui-focused fieldset': { borderColor: '#008e82' },
            },
            input: { color: '#008e82' },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, borderRadius:'50px', backgroundColor: '#008e82', color: '#fff', '&:hover': { backgroundColor: '#006f69' } }}
          onClick={handleSaveNickname}
        >
          Сохранить Никнейм
        </Button>
        
      </FormBox>
    </StyledContainer>
  );
};

export default Profile;

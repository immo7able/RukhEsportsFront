import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Footer from '../Footer';
import api from "../../api/api";

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/blur.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: '1fr auto',
  width: '100%',
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(23,54,50,0.65)',
  padding: '30px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '300px',
  },
}));

const SignUp = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with email:', email, 'and password:', password);
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      const response = await api.post('/register', { email, password, confirmPassword});
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/profile');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Непредвиденная ошибка");
      }
    }
  };

  return (
    <StyledContainer component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FormBox>
          <Typography component="h1" variant="h5" sx={{ color: '#008e82' }}>Регистрация</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: '#008e82' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#008e82',
                  },
                  '&:hover fieldset': {
                    borderColor: '#008e82',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#008e82',
                  },
                },
                input: { color: '#008e82' },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: '#008e82' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#008e82',
                  },
                  '&:hover fieldset': {
                    borderColor: '#008e82',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#008e82',
                  },
                },
                input: { color: '#008e82' },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Подтвердить пароль"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{
                style: { color: '#008e82' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#008e82',
                  },
                  '&:hover fieldset': {
                    borderColor: '#008e82',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#008e82',
                  },
                },
                input: { color: '#008e82' },
              }}
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#008e82', borderRadius:'50px', color: '#fff', '&:hover': { backgroundColor: '#006f69' } }}
            >
              Зарегистрироваться
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 1, mb: 2, color: '#008e82' }}
              onClick={() => navigate('/login')}
            >
              Уже есть аккаунт?
            </Button>
          </Box>
        </FormBox>
      </Box>
      <Footer />
    </StyledContainer>
  );
};

export default SignUp;

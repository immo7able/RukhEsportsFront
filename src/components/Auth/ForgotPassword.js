import React, { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';

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
  padding: '40px',
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      setSuccess('Запрос на восстановление пароля успешно отправлен.');
      setError('');
    } catch (error) {
      setError('Ошибка при восстановлении пароля: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <StyledContainer component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FormBox>
          <Typography component="h1" variant="h5" sx={{ color: '#008e82' }}>
            Восстановление пароля
          </Typography>
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
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            {success && <Typography color="success" variant="body2">{success}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#008e82', borderRadius: '50px', color: '#fff', '&:hover': { backgroundColor: '#006f69' } }}
            >
              Отправить запрос
            </Button>
            <Button
              fullWidth
              variant="text"
              sx={{ mt: 1, mb: 2, color: '#008e82' }}
              onClick={() => navigate('/login')}
            >
              Вернуться к входу
            </Button>
          </Box>
        </FormBox>
      </Box>
    </StyledContainer>
  );
};

export default ForgotPassword;
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(23, 54, 50, 0.85)',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '10px',
  },
}));

const ResponsiveTextField = styled(TextField)(({ theme }) => ({
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
  '& .MuiInputBase-input': {
    color: 'white',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
  },
  backgroundColor: 'rgba(23, 54, 50, 0.85)',
  borderRadius: '5px',
  width: '100%',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
}));

const MAX_COMMENT_LENGTH = 200;

const CommentForm = ({ isMobile, onCommentSubmit, onCancel, username }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    const value = event.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const commentData = {
        date: new Date().toISOString().split('T')[0],
        username: username || 'Anonymous',
        content: comment,
      };
      onCommentSubmit(commentData);
      setComment('');
      window.location.reload();

    }
  };

  return (
    <>
      <FormBox maxWidth={false} sx={{ maxWidth: '1500px' }}>
        <ResponsiveTextField
          label="Ваш комментарий"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          InputLabelProps={{
            style: { color: '#008e82', fontSize: isMobile ? '1rem' : '1.3rem' },
          }}
          InputProps={{
            sx: { fontSize: isMobile ? '1rem' : '1.3rem' },
          }}
        />
        <Typography variant="caption" sx={{ color: 'white' }}>
          {comment.length}/{MAX_COMMENT_LENGTH} символов
        </Typography>
      </FormBox>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{
            borderRadius: '40px',
            backgroundColor: 'rgb(0,142,130, 0.5)',
            ':hover': {
              backgroundColor: '#008e82',
            },
            fontSize: isMobile ? '0.8rem' : '1.3rem',
            padding: isMobile ? '5px 16px' : '12px 24px',
          }}
        >
          Отправить
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          sx={{
            borderRadius: '40px',
            borderColor: 'rgb(0,142,130, 0.5)',
            color: 'rgb(0,142,130, 0.5)',
            backgroundColor: 'transparent',
            ':hover': {
              backgroundColor: '#008e82',
              borderColor: '#008e82',
              color: 'white', 
            },
            fontSize: isMobile ? '0.8rem' : '1.3rem',
            padding: isMobile ? '5px 16px' : '12px 24px',
            ml: 2,
          }}
        >
          Отмена
        </Button>
      </Box>
    </>
  );
};

export default CommentForm;

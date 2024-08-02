import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, Avatar, Paper, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { getComments, deleteComment } from '../../api/comments';
import { getNews } from '../../api/news';

const CommentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
  marginBottom: '20px',
  color: 'white',
}));

const ReplyPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.7)',
  marginBottom: '15px',
  color: 'white',
  marginLeft: '30px',
}));

const Comments = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState('');
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getNews().then(response => setNews(response.data));
  }, []);

  useEffect(() => {
    if (selectedNews) {
      getComments(selectedNews).then(response => setComments(response.data));
    }
  }, [selectedNews]);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = comments.filter(comment => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies) {
          comment.replies = comment.replies.filter(reply => reply.id !== commentId);
        }
        return true;
      });
      setComments(updatedComments);
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  const renderReplies = (replies) => {
    if (!replies) return null;
    return replies.map((reply, replyIndex) => (
      <ReplyPaper key={reply.id || `${reply.parent_comment_id}-${replyIndex}`}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={reply.avatar} 
              alt={reply.nickname} 
              sx={{ width: 30, height: 30, mr: 1 }} 
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
              {reply.nickname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ mr: 1, color: 'white' }}>
              {new Date(reply.date).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="error" onClick={() => handleDelete(reply.id)}>
              Удалить
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mb: 2, color: 'white' }}>
          {reply.content}
        </Typography>
      </ReplyPaper>
    ));
  };

  const renderComments = (comments) => {
    return comments.map((comment, index) => (
      <CommentPaper key={comment.id || index}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={comment.avatar} 
              alt={comment.nickname} 
              sx={{ width: 40, height: 40, mr: 1 }} 
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
              {comment.nickname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'white' }}>
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="error" onClick={() => handleDelete(comment.id)}>
              Удалить
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
          {comment.content}
        </Typography>
        {comment.replies && comment.replies.length > 0 && renderReplies(comment.replies)}
      </CommentPaper>
    ));
  };

  const filteredNews = news.filter(newsItem => 
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, maxWidth: '900px', mx: 'auto', bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', borderRadius: 3, boxShadow: 3 }}>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Начните вводить название новости, чтобы отфильтровать"
        variant="outlined"
        fullWidth
        sx={{
          mb: 3,
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <Select
        value={selectedNews}
        onChange={(e) => setSelectedNews(e.target.value)}
        displayEmpty
        fullWidth
        sx={{
          mb: 3,
          color: 'white',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          '& .MuiSelect-icon': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
            },
          },
        }}
      >
        <MenuItem value="" disabled>
          Выберите новость из общего списка
        </MenuItem>
        {filteredNews.map(newsItem => (
          <MenuItem key={newsItem.id} value={newsItem.id} sx={{ color: 'white' }}>
            {newsItem.title}
          </MenuItem>
        ))}
      </Select>
      <Box>
        {renderComments(comments)}
      </Box>
    </Box>
  );
};

export default Comments;

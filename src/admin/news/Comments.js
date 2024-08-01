import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, Avatar, Paper, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { getComments, deleteComment } from '../../api/comments';
import { getNews } from '../../api/news';

const CommentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(23, 54, 50, 0.85)',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '30px',
  color: 'white',
  position: 'relative',
}));

const ReplyPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(23, 54, 50, 0.75)',
  border: '0.9px solid white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  color: 'white',
  marginLeft: '40px',
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
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {reply.nickname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              {new Date(reply.date).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="error" onClick={() => handleDelete(reply.id)}>
              Удалить
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
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
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white ' }}>
              {comment.nickname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="error" onClick={() => handleDelete(comment.id)}>
              Удалить
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
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
    <Box sx={{ p: 3, bgcolor: 'rgba(23, 54, 50, 0.75)', borderRadius: '8px', boxShadow: 3 }}>
     
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Начните вводить название новости, чтобы отфильтровать"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, bgcolor: 'rgba(23, 54, 50)', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
      />
      <Select
        value={selectedNews}
        onChange={(e) => setSelectedNews(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 3, color: 'white', bgcolor: 'rgba(23, 54, 50)' }}
      >
        <MenuItem value="" disabled>
          Выберите новость из общего списка
        </MenuItem>
        {filteredNews.map(newsItem => (
          <MenuItem key={newsItem.id} value={newsItem.id}>
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

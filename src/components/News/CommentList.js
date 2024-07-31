import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CommentForm from './CommentForm';
import { addComment, deleteComment, getComments} from '../../api/comments';
import { getProfile} from '../../api/profile';

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

const ReplyButton = styled(Button)(({ theme }) => ({
  color: 'rgb(0,142,130, 0.8)',
  ':hover': {
    backgroundColor: '#008e82',
    color: 'white',
  },
}));
const DeleteButton = styled(Button)(({ theme }) => ({
  color: 'red',
  ':hover': {
    backgroundColor: '#ff4d4d',
    color: 'white',
  },
}));

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('-');
};

const CommentList = ({ comments, isMobile, isAuthenticated, newsId }) => {
  const [replyingTo, setReplyingTo] = useState(null);
  const [localComments, setLocalComments] = useState(comments);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile();
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    }

    async function fetchComments() {
      try {
        const response = await getComments(newsId);
        setLocalComments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
      }
    }

    fetchProfile();
    fetchComments();
  }, [newsId]);

  const handleReplyClick = async (commentIndex) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
    
      setReplyingTo(commentIndex);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error(error.response.data.error);
      } else {
        console.error("Непредвиденная ошибка", error);
      }
    }
  };

  const handleCommentSubmit = async (reply, commentIndex) => {
    try {
      const parentId = localComments[commentIndex].id;
      const response = await addComment(newsId, { ...reply, nickname }, parentId);
      const updatedComments = localComments.map((comment, idx) => {
        if (idx === commentIndex) {
          return {
            ...comment,
            replies: [...(comment.replies || []), response.data]
          };
        }
        return comment;
      });
      setLocalComments(updatedComments);
      setReplyingTo(null);
    } catch (error) {
      console.error('Ошибка при добавлении ответа:', error);
    }
  };

  const handleCancel = () => {
    setReplyingTo(null);
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = localComments.filter(comment => comment.id !== commentId);
      setLocalComments(updatedComments);
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  const renderReplies = (replies) => {
    if (!replies) return null;
    return replies.map((reply, replyIndex) => (
      <ReplyPaper key={reply.id || `${reply.parent_comment_id}-${replyIndex}`} elevation={3}>
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
              sx={{ width: isMobile ? 30 : 40, height: isMobile ? 30 : 40, mr: 1 }} 
            />
            <Typography
              variant="subtitle2"
              color="white"
              sx={{ fontSize: isMobile ? '0.9rem' : '1.1rem', fontFamily: 'Oswald, serif' }}
            >
              {reply.nickname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle2"
              color="white"
              sx={{ fontSize: isMobile ? '0.9rem' : '1.1rem', mr: 1, fontFamily: 'Oswald, serif' }}
            >
              {formatDate(reply.date)}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: 'white',
            fontSize: isMobile ? '0.9rem' : '1.1rem', 
            fontFamily: 'Oswald, serif'
          }}
        >
          {reply.content}
        </Typography>
      </ReplyPaper>
    ));
  };

  return (
    <>
      {localComments.map((comment, index) => (
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
                sx={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, mr: 1 }} 
              />
              <Typography
                variant="subtitle2"
                color="white"
                sx={{ fontSize: isMobile ? '1rem' : '1.3rem', fontFamily: 'Oswald, serif' }}
              >
                {comment.nickname}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="subtitle2"
                color="white"
                sx={{ fontSize: isMobile ? '1rem' : '1.3rem', mb: 1, fontFamily: 'Oswald, serif' }}
              >
                {formatDate(comment.date)}
              </Typography>
              {nickname === comment.nickname && (
                <DeleteButton onClick={() => handleDelete(comment.id)}>
                  Удалить
                </DeleteButton>
              )}
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: 'white',
              fontSize: isMobile ? '1rem' : '1.3rem',
              fontFamily: 'Oswald, serif'
            }}
          >
            {comment.content}
          </Typography>
          {/* <ReplyButton onClick={() => handleReplyClick(index)} sx={{ mb: 2, fontSize: isMobile ? '0.75rem' : '1.2rem', fontFamily: 'Oswald, serif' }}>
            Ответить
          </ReplyButton> */}
          {replyingTo === index && (
            <Box sx={{ mb: 2 }}>
              <CommentForm 
                isMobile={isMobile}
                onCommentSubmit={(reply) => handleCommentSubmit(reply, index)}
                onCancel={handleCancel}
                nickname={nickname} 
              />
            </Box>
          )}
          {renderReplies(comment.replies)}
        </CommentPaper>
      ))}
    </>
  );
};

export default CommentList;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, IconButton, useMediaQuery, useTheme, Button, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import Footer from '../Footer';
import LikeButtonWithCounter from './LikeButtonWithCounter';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import NewsContent from './NewsContent';
import { getNewsItem } from '../../api/news';
import { getComments, addComment } from '../../api/comments';

const NewsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(23, 54, 50, 0.65)',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '20px auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '20px',
  },
}));

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).split('/').join('-');
};

const NewsDetail = ({ isAuthenticated }) => {
  const { discipline, id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = location.state?.from || `/newspage/${discipline.toLowerCase()}`;
  
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentField, setShowCommentField] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const topRef = useRef(null);
  
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const fetchNewsItemAndComments = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const newsResponse = await getNewsItem(discipline, id); 
        setNewsItem(newsResponse.data);
        setLikeCount(newsResponse.data.likeCount); 
  
        try {
          const commentsResponse = await getComments(id);
          setComments(commentsResponse.data);
        } catch (error) {
          setComments([]);
          setError('Ошибка при загрузке комментариев.');
        }
      } catch (error) {
        setError('Новость не найдена.');
      }
  
      setLoading(false);
    };
  
    fetchNewsItemAndComments();
  }, [discipline, id]);  
  

  const handleLikeClick = () => {
    setLike((prev) => !prev);
    setLikeCount((prevCount) => like ? prevCount - 1 : prevCount + 1);
  };

  const handleCommentSubmit = async (newComment, parentId = null) => {
    try {
      const response = await addComment(id, newComment, parentId);
      const updatedComments = [...comments];
      if (parentId) {
        const parentComment = updatedComments.find(comment => comment.id === parentId);
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push(response.data);
      } else {
        updatedComments.push(response.data);
      }
      setComments(updatedComments);
      setShowCommentField(false);
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCommentButtonClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowCommentField(true);
    }
  };

  if (loading) {
    return (
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }
  

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <>
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10:15 }}>
        <NewsWrapper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', flex: 1, fontFamily: 'Oswald, serif' }}>{newsItem.title}</Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{
              mb: 6,
              color: 'white',
              textAlign: 'center',
              fontSize: isMobile ? '1rem' : '2rem',
              border: '1px solid rgb(0,142,130, 0.7)',
              padding: '4px',
              borderRadius: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <IconButton onClick={() => navigate(previousPage)} sx={{ color: 'white' }}>
              <ArrowCircleLeftOutlinedIcon fontSize="large" />
            </IconButton>
            <Box sx={{ fontSize: isMobile ? '1.2rem' : '2rem', fontFamily: 'Oswald, serif' }}>
              {formatDate(newsItem.date)}
            </Box>
            <LikeButtonWithCounter 
              likeCount={likeCount}
              liked={like}
              onClick={handleLikeClick}
            />
          </Typography>
          <NewsContent newsItem={newsItem} isMobile={isMobile} />
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{
              mb: 2,
              color: 'white',
              textAlign: 'center',
              fontSize: isMobile ? '1.3rem' : '2rem',
              border: '1px solid rgb(0,142,130, 0.7)',
              padding: '4px',
              borderRadius: '40px', 
              fontFamily: 'Oswald, serif'
            }}>Комментарии</Typography>
            <CommentList comments={comments} isMobile={isMobile} />
            {showCommentField ? (
              <CommentForm 
                isMobile={isMobile} 
                onCommentSubmit={handleCommentSubmit} 
                onCancel={() => setShowCommentField(false)}
              />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentButtonClick}
                  sx={{
                    backgroundColor: 'rgb(0,142,130, 0.5)',
                    ':hover': {
                      backgroundColor: '#008e82',
                    },
                    fontSize: isMobile ? '0.75rem' : '1rem',
                    padding: isMobile ? '8px 16px' : '12px 24px', 
                    fontFamily: 'Oswald, serif'
                  }}
                >
                  Прокомментировать
                </Button>
              </Box>
            )}
          </Box>
        </NewsWrapper>
      </Container>
      <Footer />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Ошибка при добавлении комментария.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default NewsDetail;

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
import { getNewsItem, likeNewsItem, isLiked } from '../../api/news';
import { addComment, getComments} from '../../api/comments';
import { getProfile} from '../../api/profile';

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
  const [commentsError, setCommentsError] = useState(null);
  const [showCommentField, setShowCommentField] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [nickname, setNickname] = useState('');
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
    const fetchProfile = async () => {
      try {
        const profileResponse = await getProfile();
        setNickname(profileResponse.data.nickname);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    };

    const fetchNewsItemAndComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const newsResponse = await getNewsItem(discipline, id);
        setNewsItem(newsResponse.data);
        setLikeCount(newsResponse.data.likeCount);
        const likeResponse = await isLiked(id);
        setLike(likeResponse.data);

        try {
          const commentsResponse = await getComments(id);
          const formattedComments = formatComments(commentsResponse.data);
          setComments(formattedComments);
        } catch (error) {
          setComments([]);
          setCommentsError('Ошибка при загрузке комментариев.');
        }
      } catch (error) {
        setError('Новость не найдена.');
      }

      setLoading(false);
    };

    fetchProfile();
    fetchNewsItemAndComments();
  }, [discipline, id]);

  const formatComments = (comments) => {
    const commentMap = {};
    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment.id] = comment;
    });
    const formattedComments = [];
    comments.forEach((comment) => {
      if (comment.parent_comment_id) {
        commentMap[comment.parent_comment_id].replies.push(comment);
      } else {
        formattedComments.push(comment);
      }
    });
    return formattedComments;
  };

  const handleLikeClick = async () => {
    setLike((prev) => !prev);
    setLikeCount((prevCount) => like ? prevCount - 1 : prevCount + 1);
    try {
      await likeNewsItem(id, !like);
    } catch (error) {
      console.error('Error liking the news item:', error);
      setLike((prev) => !prev);
      setLikeCount((prevCount) => like ? prevCount + 1 : prevCount - 1);
    }
  };

  const handleCommentSubmit = async (newComment, parentId = null) => {
    try {
      const commentData = { ...newComment, nickname };
      const response = await addComment(id, commentData, parentId);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box className="loader">
          <Box className="half-ring"></Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth={false} sx={{ px: isMobile ? 2 : 4, maxWidth: isMobile ? '100%' : '1300px', marginTop: isMobile ? 10 : 15 }}>
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
            {commentsError ? (
              <Typography variant="h6" color="error">{commentsError}</Typography>
            ) : (
              <CommentList comments={comments} isMobile={isMobile} newsId={id} />
            )}
            {showCommentField ? (
              <CommentForm
                isMobile={isMobile}
                onCommentSubmit={handleCommentSubmit}
                onCancel={() => setShowCommentField(false)}
                nickname={nickname} // Передаем nickname сюда
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

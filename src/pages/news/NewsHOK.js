import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import NewsList from '../../components/News/NewsList';
import { getAllNews } from '../../api/news';

const NHOK = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchNews = async () => {
      try {
        const response = await getAllNews('hok');
        setNews(response.data);
      } catch (error) {
        setError('Ошибка при загрузке данных новостей');
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

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
  

  return <NewsList newsData={news} type="HOK" />;
};

export default NHOK;

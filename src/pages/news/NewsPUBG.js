import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import NewsList from '../../components/News/NewsList';
import { getNewsItem } from '../../api/news'; 

const NPUBG = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchNews = async () => {
      try {
        const data = await getNewsItem('pubg');
        setNews(data.data.pubg);
      } catch (error) {
        setError('Ошибка при загрузке данных новостей');
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box className="loader">
        <Box className="half-ring"></Box>
      </Box>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <NewsList newsData={news} type="PUBG" />;
};

export default NPUBG;

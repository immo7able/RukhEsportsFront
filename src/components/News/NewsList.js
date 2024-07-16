import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Pagination, useMediaQuery, useTheme } from '@mui/material';
import NewsCard from './NewsCard';

const itemsPerPage = 3;

const NewsList = ({ newsData, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [page]);

  const paginatedData = newsData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const paginationStyles = {
    backgroundColor: 'rgba(23,54,50,0.65)',
    border: '1px solid #008e82',
    borderRadius: '8px',

    '& .Mui-selected': {
      backgroundColor: 'rgb(4,141,131, 0.5)',
      border: '1px solid #008e82',
      color: 'white',
    },
    '& .MuiPaginationItem-root:hover': {
      backgroundColor: '#008e82',
    },
    '& .MuiPaginationItem-ellipsis': {
      color: 'white',
    },
    '& .MuiPaginationItem-icon': {
      backgroundColor: 'rgb(4,141,131, 0.5)',
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#008e82',
      },
    },
    '@media (max-width: 600px)': {
      padding: '4px',
      '& .MuiPaginationItem-root': {
        fontSize: '0.75rem',
        minWidth: '32px',
        height: '32px',
      },
      '& .MuiPaginationItem-icon': {
        fontSize: '1.2rem',
      },
    },
  };

  return (
    <Container maxWidth={false} sx={{ px: isMobile ? 0 : 4, maxWidth: isMobile ? '100%' : '1500px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', }}>
        <Pagination
          count={Math.ceil(newsData.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          sx={paginationStyles}
        />
      </Box>
      <Box
        ref={containerRef}
        sx={{
          maxHeight: '65vh',
          overflowY: 'auto',
          maxWidth: isMobile ? '100%' : '1500px',
          marginTop: 4,
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
          {paginatedData.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={{ ...newsItem, type }} isMobile={isMobile} />
          ))}
        </Box>
      </Box>
      
    </Container>
  );
};

export default NewsList;

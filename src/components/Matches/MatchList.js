import React, { useState, useEffect } from 'react';
import { Box, Container, Pagination, useMediaQuery, useTheme } from '@mui/material';
import MatchCard from './MatchCard';

const itemsPerPage = 3;

const MatchList = ({ matchesData, type, status }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredData = matchesData.filter(match => match.status.toLowerCase() === status.toLowerCase());
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth={false} sx={{ px: isMobile ? 0 : 4, maxWidth: isMobile ? '100%' : '1500px', marginTop: 5 }}>
      <Box>
        {paginatedData.map((match) => (
          <MatchCard key={match.id} match={{ ...match, type }} isMobile={isMobile} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Pagination 
          count={Math.ceil(filteredData.length / itemsPerPage)} 
          page={page} 
          onChange={handleChange} 
          sx={{
            backgroundColor: 'rgba(23,54,50,0.65)', 
            border: '1px solid #008e82',
            borderRadius: '8px',
            padding: '8px',
            '& .Mui-selected': {
              backgroundColor: 'rgb(4,141,131, 0.5)', 
              border: '1px solid #008e82',
              color: 'white'
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#008e82' 
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'white'
            },
            '& .MuiPaginationItem-icon': {
              backgroundColor: 'rgb(4,141,131, 0.5)',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#008e82'
              }
            },
            '@media (max-width: 600px)': {
              padding: '4px',
              '& .MuiPaginationItem-root': {
                fontSize: '0.75rem', 
                minWidth: '32px', 
                height: '32px' 
              },
              '& .MuiPaginationItem-icon': {
                fontSize: '1.2rem' 
              }
            }
          }}
        />
      </Box>
    </Container>
  );
};

export default MatchList;

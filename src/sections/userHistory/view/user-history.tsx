import React, { useState } from 'react';
import { Box, Card, Typography, CardContent, Pagination, Rating } from '@mui/material';
import { getAllMockData } from 'src/_mock/_userHistory';
import { HistoryRow } from 'src/sections/auth/userHistory'; 

export const UserHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const allData: HistoryRow[] = getAllMockData();
  const dataToDisplay = allData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '24px',
      }}
    >
      <Box
        sx={{
          width: '80%',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1976d2',
            fontWeight: '700',
            fontSize: { xs: '20px', md: '24px' },
          }}
        >
          User History
        </Typography>

        {dataToDisplay.map((row) => (
          <Card
            key={row.id}
            sx={{
              marginBottom: '16px',
              backgroundColor: '#fff',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            {/* First Row: Source, Destination, Rating */}
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                {row.source}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                {row.destination}
              </Typography>
              <Rating
                value={Math.abs(row.rating)} // Convert negative values to positive for display
                max={5}
                readOnly
                precision={0.5}
              />
            </CardContent>

            {/* Second Row: Distance, Time Taken */}
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                Distance: {row.distance}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                Time Taken: {row.timeTaken}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Pagination
          count={Math.ceil(allData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Box>
    </Box>
  );
};

export default UserHistory;

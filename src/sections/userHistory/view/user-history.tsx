import React, { useState } from 'react';
import { Box, Card, Typography, CardContent, Pagination, Rating, Button } from '@mui/material';
import { getAllMockData } from 'src/_mock/_userHistory';
import { HistoryRow } from 'src/sections/auth/userHistory';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';

export const UserHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const allData: HistoryRow[] = getAllMockData();
  const dataToDisplay = allData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <DashboardContent>
      {/* <Box sx={{ padding: '2.5rem' }}> */} {/* Similar padding to UserView */}
      {/* User History Header */}
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Travel History
        </Typography>
      </Box>
      {/* <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h4" flexGrow={1}>
          Travel History
        </Typography>
      </Box> */}
      <Card sx={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
        {dataToDisplay.map((row) => (
          <Card
            key={row.id}
            sx={{
              marginBottom: '1.5rem',
              backgroundColor: '#fff',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
              borderRadius: '0.75rem',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-0.3125rem)',
              },
            }}
          >
            {/* First Row: Source, Destination, Rating */}
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem', // Maintain consistent padding
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>
                Source: <strong>{row.source}</strong>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>
                Destination: <strong> {row.destination}</strong>
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
                padding: '1rem',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                Distance: <strong>{row.distance}</strong>
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                Time Taken: <strong>{row.timeTaken}</strong>
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Pagination */}
        <Pagination
          count={Math.ceil(allData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            marginTop: '2rem', // Consistent spacing with UserView
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </Card>
      {/* </Box> */}
    </DashboardContent>
  );
};

export default UserHistory;

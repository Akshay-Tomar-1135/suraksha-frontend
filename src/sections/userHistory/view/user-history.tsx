import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { getAllMockData } from 'src/_mock/_userHistory'; // Adjust this import based on your file structure
import { Box, Card, Typography } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'; // You can add more icons as needed



interface HistoryRow {
  id: string;
  source: string;
  destination: string;
  rating: number;
  travelMode: string;  
}

const getDotColor = (rating: number) => {
  if (rating === -1) return 'green';
  if (rating <= -2 && rating >= -3) return '#FFD700';
  if (rating <= -4 && rating >= -5) return '#FF0000';
  return 'gray';
};

const getTravelIcon = (mode: string) => {
  switch (mode) {
    case 'foot':
      return <DirectionsWalkIcon sx={{ color: '#1976d2' }} />;
    case 'cab':
      return <LocalTaxiIcon sx={{ color: '#fbc02d' }} />;
    case 'bus':
      return <DirectionsBusIcon sx={{ color: '#4caf50' }} />;
    default:
      return null; // Return nothing if no matching icon
  }
};

export const UserHistory: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const allData: HistoryRow[] = getAllMockData();
  const dataToDisplay = allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <Card
        sx={{
          width: '80%',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1976d2',
            fontWeight: '700',
            fontSize: { xs: '24px', md: '28px' },
            fontFamily: 'DM Sans, sans-serif', // Applying DM Sans for headings
            letterSpacing: '0.5px',
          }}
        >
          User History
        </Typography>

        <TableContainer>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ width: '100%', minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f7f7f7' }}>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '14px', md: '16px' },
                      color: '#333',
                      fontFamily: 'Barlow, sans-serif',
                      padding: '12px 16px',
                    }}
                  >
                    Source
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '14px', md: '16px' },
                      color: '#333',
                      fontFamily: 'Barlow, sans-serif',
                      padding: '12px 16px',
                    }}
                  >
                    Destination
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '14px', md: '16px' },
                      color: '#333',
                      fontFamily: 'Barlow, sans-serif',
                      padding: '12px 16px',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    Mode of Travel
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '14px', md: '16px' },
                      color: '#333',
                      fontFamily: 'Barlow, sans-serif',
                      padding: '12px 16px',
                    }}
                  >
                    Ratings
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataToDisplay.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: '#fff',
                      borderBottom: '1px solid #e0e0e0',
                      '&:hover': { backgroundColor: '#fafafa' },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: { xs: '12px', md: '14px' },
                        color: '#555',
                        fontFamily: 'Barlow, sans-serif',
                        padding: '12px 16px',
                      }}
                    >
                      {row.source}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: { xs: '12px', md: '14px' },
                        color: '#555',
                        fontFamily: 'Barlow, sans-serif',
                        padding: '12px 16px',
                      }}
                    >
                      {row.destination}
                    </TableCell>
                    <TableCell>
                      {getTravelIcon(row.travelMode)}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          width: '40px',
                          height: '40px',
                          backgroundColor: getDotColor(row.rating),
                          color: 'white',
                          textAlign: 'center',
                          lineHeight: '40px',
                          borderRadius: '50%',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          cursor: 'pointer',
                          fontFamily: 'DM Sans, sans-serif', // DM Sans for rating circles
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                          },
                        }}
                      >
                        {row.rating}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              marginTop: '16px',
              borderTop: '1px solid #e0e0e0',
              paddingTop: '12px',
              fontFamily: 'Barlow, sans-serif',
              '& .MuiTablePagination-toolbar': {
                justifyContent: 'center',
              },
            }}
          />
        </TableContainer>
      </Card>
    </Box>
  );
};

export default UserHistory;

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

interface HistoryRow {
  id: string;
  source: string;
  destination: string;
  rating: number;
}

const getDotColor = (rating: number) => {
  if (rating === -1) {
    return 'green';
  }
  if (rating <= -2 && rating >= -3) {
    return '#FFD700';
  }
  if (rating <= -4 && rating >= -5) {
    return '#FF0000';
  }
  return 'gray';
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
    <Card sx={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
      <TableContainer>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ width: '100%', minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'white' }}>
                <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      marginBottom: '16px', 
                      color: '#1976d2', 
                      fontWeight: 'bold', 
                      fontSize: { xs: '20px', md: '24px' }
                    }}
                  >
                    User History
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '14px', md: '16px' } }}>Source</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '14px', md: '16px' } }}>Destination</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '14px', md: '16px' } }}>Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToDisplay.map((row) => (
                <TableRow key={row.id} sx={{ backgroundColor: 'white', borderRadius: '8px' }}>
                  <TableCell sx={{ fontSize: { xs: '12px', md: '14px' } }}>{row.source}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '12px', md: '14px' } }}>{row.destination}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '40px',
                        height: '40px',
                        backgroundColor: getDotColor(row.rating),
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget.style.transform = 'scale(1.1)');
                        (e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)');
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget.style.transform = 'scale(1)');
                        (e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)');
                      }}
                    >
                      {row.rating}
                    </span>
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
        />
      </TableContainer>
    </Card>
  );
};

export default UserHistory;

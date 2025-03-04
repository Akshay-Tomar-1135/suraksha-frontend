import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { DashboardContent } from 'src/layouts/dashboard';
import { mockData } from '../../../_mock/_userHistory';

export const FindMyBuddy: React.FC = () => {
  const [requests, setRequests] = useState(mockData(2));
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Find My Buddy
        </Typography>
      </Box>

      <Box>
        <Paper elevation={3} sx={{ padding: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{
                padding: '12px 16px',
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
              }}
              onClick={handleOpenDialog}
            >
              + Add New Request
            </Button>
          </Box>

          {/* Dialog for adding a new request */}
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Add New Request
              <IconButton onClick={handleCloseDialog} sx={{ color: '#555' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                  label="Source"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  label="Destination"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ borderRadius: 1 }}
                />
                <TextField
                  label="Date and Time"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '16px' }}>
              <Button onClick={handleCloseDialog} sx={{ color: '#555' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Grid
            container
            spacing={0}
            alignItems="center"
            sx={{
              mt: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              p: 3,
              borderRadius: 1,
              backgroundColor: 'white',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField label="Source" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Destination" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Time" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: '#000',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Search Requests
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              height: 300,
              // border: '1px solid #ccc',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6">MAP</Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            {requests.map((request, index) => (
              <Paper
                key={request.id}
                elevation={2}
                sx={{
                  padding: 2,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Typography>User {index + 1}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Typography>{request.source}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Typography>{request.destination}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Typography>{request.timeTaken}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                      }}
                    >
                      <Button
                        fullWidth
                        sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          '&:hover': { backgroundColor: '#333' },
                        }}
                      >
                        Chat with her
                      </Button>
                      <Button
                        fullWidth
                        sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          '&:hover': { backgroundColor: '#333' },
                        }}
                      >
                        Show Route
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </DashboardContent>
  );
};

export default FindMyBuddy;

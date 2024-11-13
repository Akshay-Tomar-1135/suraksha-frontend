import React, { useState } from 'react';
import { Box, Button, TextField, Avatar, Typography, Card, Grid, Modal, InputAdornment } from '@mui/material';

export function ProfileView() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    phoneNumber: '1234567890',
    aadharNumber: '****5678',
    state: 'California',
    age: '25',
    gender: 'Male',
    email: 'john.doe@example.com',
    avatar: '/path/to/avatar.jpg', // Your avatar image path here
  });

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ p: 3, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', maxWidth: 900, mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Avatar + Name/Title */}
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2, boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
            />
            <Typography variant="h5" fontWeight="bold">{profile.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{profile.state}</Typography>
            {/* <Typography variant="body2" sx={{ mt: 1, cursor: 'pointer', color: '#1976d2' }}>
              Avatar by gravatar.com. Or upload your own...
            </Typography> */}
          </Grid>

          {/* Profile Information */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Profile Information</Typography>
            <Box component="div" sx={{ display: 'grid', gap: 2 }}>
              <TextField
                label="Name"
                value={profile.name}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={profile.phoneNumber}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="Aadhar Number"
                value={profile.aadharNumber}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <TextField
                label="State"
                value={profile.state}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              
              {/* Age Group and Gender in the same row */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Age"
                    value={profile.age}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Gender"
                    value={profile.gender}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <TextField
                label="Email"
                value={profile.email}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>

            <Button variant="contained" sx={{ mt: 3 }} onClick={handleOpenModal}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Modal for Editing Profile */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" mb={2}>Edit Profile</Typography>
          <Box component="form" sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="outlined" size="small">Verify OTP</Button>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Avatar
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleCloseModal}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

// export default ProfilePage;

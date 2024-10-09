// user-edit-modal.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

type UserEditModalProps = {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    company: string;
    role: string;
    status: string;
    isVerified: boolean;
    // avatarUrl: string;
  };
  onEditUser: (updatedUser: {
    id: string;
    name: string;
    company: string;
    role: string;
    isVerified: boolean;
    status: string;
    // avatarUrl: string;
  }) => void;
};

export function UserEditModal({ open, onClose, user, onEditUser }: UserEditModalProps) {
  const [name, setName] = useState(user.name);
  const [company, setCompany] = useState(user.company);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const [errors, setErrors] = useState({
    name: false,
    company: false,
    role: false,
    status: false,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Snackbar severity


  useEffect(() => {
    setName(user.name);
    setCompany(user.company);
    setRole(user.role);
    setStatus(user.status);
  }, [user]);

  const handleClose = () => {
    setErrors({
      name: false,
      company: false,
      role: false,
      status: false,
    });
    onClose();
  };

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '',
      company: company.trim() === '',
      role: role.trim() === '',
      status: status.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleEditUser = async () => {
    if (validateFields()) {
      try {
        
        const result = await updateUserContact(user.role, {
          name,
          company,
          relation: '', 
          new_phone_number: role,
          email: '', 
          status,
          priority: 1, 
          latitude: 0, 
          longitude: 0, 
        });

        if (result.success) {
          // Show success message
          setSnackbarMessage('User updated successfully!');
          setSnackbarSeverity('success');
          onEditUser({ id: user.id, name, company, role, isVerified: user.isVerified, status });
          handleClose();
        } else {
          // Show error message
          setSnackbarMessage(result.message || 'Failed to update user');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        // Handle unexpected errors
        console.error('Error updating user contact:', error);
        setSnackbarMessage('An error occurred while updating the user');
        setSnackbarSeverity('error');
      } finally {
        setSnackbarOpen(true); // Show snackbar
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      aria-labelledby="form-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2, // Rounded corners
          padding: 2, // Adds padding around the dialog content
          boxShadow: 5, // Adds a shadow to the dialog
          bgcolor: 'background.default', // Background color from theme
        },
      }}
    >
      <DialogTitle
      id="form-dialog-title"
      sx={{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        // color: 'primary.main',
        // mb: 2,
      }}>
        Edit User
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="dense"
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
            required
            error={errors.company}
            helperText={errors.company ? 'Company is required' : ''}
          />
          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
            error={errors.role}
            helperText={errors.role ? 'Role is required' : ''}
          />
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
            error={errors.status}
            helperText={errors.status ? 'Status is required' : ''}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEditUser} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>

    {/* Snackbar for success or error feedback */}
    <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000}
    onClose={handleSnackbarClose}
    >
    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
      {snackbarMessage}
    </Alert>
  </Snackbar>
  </>
  );
}

async function updateUserContact(oldPhoneNumber: string, updatedContactData: any) {
  try {
    const response = await fetch('http://localhost:8000/update_user_contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: oldPhoneNumber, // Old phone number
        aadhaar_number: 123456789,
        name: updatedContactData.name,
        relation: updatedContactData.company,
        new_phone_number: updatedContactData.new_phone_number, // New phone number
        email: updatedContactData.email,
        status: updatedContactData.status,
        priority: updatedContactData.priority,
        latitude: updatedContactData.latitude,
        longitude: updatedContactData.longitude,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    }
    return { success: false, message: data.message };
  } catch (error) {
    console.error('Error updating user contact:', error);
    return { success: false, message: 'An error occurred while updating the user contact.' };
  }
}
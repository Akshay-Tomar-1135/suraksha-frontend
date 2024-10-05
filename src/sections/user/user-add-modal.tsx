// user-add-modal.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { _company } from 'src/_mock';

type UserAddModalProps = {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: {
    id: string;
    name: string;
    company: string;
    role: string;
    isVerified: boolean;
    status: string;
    avatarUrl: string;
  }) => void;
};

async function addUserContact(contact: any): Promise<Response> { // Return the response object
  try {
    const response = await fetch('http://localhost:8000/add_user_contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    return response; // Return the response object
  } catch (error) {
    console.error('Error adding user contact:', error);
    throw new Error('An error occurred while adding the user contact.');
  }
}


export function UserAddModal({ open, onClose, onAddUser }: UserAddModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    name: false,
    company: false,
    role: false,
    status: false,
    email: false
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleClose = () => {
    setName('');
    setCompany('');
    setRole('');
    setStatus('');
    setEmail('');
    setErrors({
      name: false,
      company: false,
      role: false,
      status: false,
      email: false,
    });
    onClose();
  };

   // Close Snackbar
   const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Validation logic
  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '',
      company: company.trim() === '',
      role: role.trim() === '',
      status: status.trim() === '',
      email: email.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  function generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }  

  const handleAddUser = async () => {
    if (validateFields()) {
      const newUserContact = {
        aadhaar_number: 123456789, // Hardcoded or dynamic value
        name,
        relation: company,
        phone_number: role,
        email,
        status,
        priority: 1, // Add a default priority value
        latitude: 0.0, // You can get dynamic lat/lon if needed
        longitude: 0.0,
      };
  
      try {
        // Call the API to add the user contact
        const response = await addUserContact(newUserContact);
  
        // If the API call is successful, update the UI
        if (response.ok) {
          onAddUser({
            id: generateUniqueId(), // Replace with unique ID generation logic
            name,
            company,
            role,
            isVerified: false, // Default value, can be updated as needed
            status,
            avatarUrl: ''
          });
  
          // Show success message
          setSnackbarSeverity('success');
          setSnackbarMessage('User added successfully');
        } else {
          const data = await response.json();
          // Show error message
          setSnackbarSeverity('error');
          setSnackbarMessage(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error adding user contact:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('An error occurred while adding the user contact.');
      } finally {
        // Close the form regardless of success or failure
        handleClose();
        setSnackbarOpen(true);
      }
    }
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
        New User
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        >
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="dense" 
          required
          error={errors.name} // Show error style
          helperText={errors.name ? 'Name is required' : ''} // Error message
        />
        <TextField
          label="Relation"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          variant="outlined"
          required
          error={errors.company}
          helperText={errors.company ? 'Relation is required' : ''}
        />
        <TextField
          label="Phone number"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          variant="outlined"
          required
          error={errors.role}
          helperText={errors.role ? 'Phone No. is required' : ''}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          required
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          variant="outlined"
          required
          error={errors.status}
          helperText={errors.status ? 'Status is required' : ''}
        />
        </Box>
      </DialogContent>
      <DialogActions
         sx={{
          display: 'flex',
          // justifyContent: '',
          gap: 1,
          mt: 2,
        }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddUser} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>

    {/* Snackbar for notifications */}
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000} // Automatically closes after 6 seconds
  onClose={handleSnackbarClose} // Called when it auto-closes or user closes it manually
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>
  </>
  );
}


// name = name
// relation = company
// phone no = role 
// status = status
// isVerified = email
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useToast } from 'src/components/snackBar/ToastContext';
import { userService } from 'src/service/userService';

type UserAddModalProps = {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: {
    id: string;
    name: string;
    phoneNum: string;
    status: string;
    relation: string;
    avatarUrl?: string;
    email: string;
    latitude: number;
    longitude: number;
    priority: number;
  }) => void;
};

export function UserAddModal({ open, onClose, onAddUser }: UserAddModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState(1);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [errors, setErrors] = useState({
    name: false,
    relation: false,
    phone: false,
    status: false,
    email: false,
  });

  const handleClose = () => {
    setName('');
    setRelation('');
    setPhone('');
    setStatus('');
    setEmail('');
    setPriority(1);
    setLatitude(0);
    setLongitude(0);
    setErrors({
      name: false,
      relation: false,
      phone: false,
      status: false,
      email: false,
    });
    onClose();
  };

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '',
      relation: relation.trim() === '',
      phone: phone.trim() === '',
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
        aadhaar_number: 123456789,
        name,
        relation,
        phone_number: phone,
        email,
        status,
        priority,
        latitude,
        longitude,
      };

      try {
        const response = await userService.addUserContact(newUserContact);
      
        if (response.ok) {
          onAddUser({
            id: generateUniqueId(),
            name,
            phoneNum: phone,
            status,
            relation,
            email,
            latitude,
            longitude,
            priority,
            avatarUrl: '',
          });
      
          showToast('User added successfully', { severity: 'success' });
        } else {
          const data = await response.json();
          showToast(`Error: ${data.message}`, { severity: 'error' });
        }
      } catch (error) {
        console.error('Error adding user contact:', error);
        showToast('An error occurred while adding the user contact.', { severity: 'error' });
      } finally {
        handleClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="form-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          padding: 2,
          boxShadow: 5,
          bgcolor: 'background.default',
        },
      }}
    >
      <DialogTitle id="form-dialog-title" sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        New User
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required error={errors.name} helperText={errors.name ? 'Name is required' : ''} />
          <TextField label="Relation" value={relation} onChange={(e) => setRelation(e.target.value)} required error={errors.relation} helperText={errors.relation ? 'Relation is required' : ''} />
          <TextField label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required error={errors.phone} helperText={errors.phone ? 'Phone No. is required' : ''} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required error={errors.email} helperText={errors.email ? 'Email is required' : ''} />
          <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required error={errors.status} helperText={errors.status ? 'Status is required' : ''} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddUser} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

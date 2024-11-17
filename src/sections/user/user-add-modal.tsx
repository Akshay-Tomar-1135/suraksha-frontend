import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
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
import PhoneInput from '../auth/phoneInput';

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
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState(1);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [errors, setErrors] = useState({
    name: '',
    relation: '',
    countryCode: '',
    phoneNumber: '',
    status: '',
    email: '',
  });

  const handleClose = () => {
    setName('');
    setRelation('');
    setCountryCode('');
    setPhoneNumber('');
    setStatus('');
    setEmail('');
    setPriority(1);
    setLatitude(0);
    setLongitude(0);
    setErrors({
      name: '',
      relation: '',
      countryCode: '',
      phoneNumber: '',
      status: '',
      email: '',
    });
    onClose();
  };

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '' ? 'Name is required' : '',
      relation: relation.trim() === '' ? 'Relation is required' : '',
      countryCode: /^\d{1,3}$/.test(countryCode) ? '' : 'Country Code must be 1-3 digits',
      phoneNumber: /^\d{10}$/.test(phoneNumber) ? '' : 'Phone Number must be 10 digits',
      status: status.trim() === '' ? 'Status is required' : '',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddUser = async () => {
    if (validateFields()) {
      const newUserContact = {
        aadhaar_number: 123456789, // Hardcoded for the time being
        name,
        relation,
        phone_number: phoneNumber,
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
            id: nanoid(),
            name,
            phoneNum: phoneNumber,
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

  const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = event.target;
    if (inputName === 'countryCode') {
      setCountryCode(value);
    } else if (inputName === 'phoneNumber') {
      setPhoneNumber(value);
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
          <TextField
            label="Name"
            sx={{marginTop:1}}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            required
            error={Boolean(errors.relation)}
            helperText={errors.relation}
          />
          <PhoneInput
            countryCode={countryCode}
            phoneNumber={phoneNumber}
            setValue={handlePhoneInputChange}
            formErrors={{
              countryCode: errors.countryCode,
              phoneNumber: errors.phoneNumber,
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            error={Boolean(errors.status)}
            helperText={errors.status}
          />
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

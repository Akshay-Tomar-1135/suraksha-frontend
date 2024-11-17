import React, { useState, useEffect } from 'react';
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

type UserEditModalProps = {
  open: boolean;
  onClose: () => void;
  user: {
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
  };
  onEditUser: (updatedUser: {
    id: string;
    name: string;
    relation: string;
    phoneNum: string;
    email: string;
    status: string;
    latitude: number;
    longitude: number;
    priority: number;
  }) => void;
};

export function UserEditModal({ open, onClose, user, onEditUser }: UserEditModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [relation, setRelation] = useState(user.relation);
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNum);
  const [email, setEmail] = useState(user.email);

  const [errors, setErrors] = useState({
    name: '',
    relation: '',
    countryCode: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (open) {
      setName(user.name);
      setRelation(user.relation);
      setCountryCode('91'); 
      setPhoneNumber(user.phoneNum);
      setEmail(user.email);
    }
  }, [open, user]);

  const handleClose = () => {
    setErrors({
      name: '',
      relation: '',
      countryCode: '',
      phoneNumber: '',
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
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = event.target;
    if (inputName === 'countryCode') {
      setCountryCode(value);
    } else if (inputName === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  const handleEditUser = async () => {
    if (validateFields()) {
      try {
        const result = await userService.updateUserContact({
          old_phone_number: user.phoneNum,
          aadhaar_number: 123456789, // hardcoded for the time being
          name,
          relation,
          new_phone_number: phoneNumber,
          email,
          status: user.status,
          priority: user.priority,
          latitude: user.latitude,
          longitude: user.longitude,
        });

        if (result.success) {
          showToast('User updated successfully', { severity: 'success' });
          onEditUser({
            id: user.id,
            name,
            relation,
            phoneNum: phoneNumber,
            email,
            status: user.status,
            latitude: user.latitude,
            longitude: user.longitude,
            priority: user.priority,
          });
          handleClose();
        } else {
          showToast(`Error: ${result.message}`, { severity: 'error' });
        }
      } catch (error) {
        console.error('Error updating user contact:', error);
        showToast('An error occurred while updating the user.', { severity: 'error' });
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
      <DialogTitle
        id="form-dialog-title"
        sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        Edit User
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            sx={{marginTop:1}}
            label="Name"
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEditUser} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

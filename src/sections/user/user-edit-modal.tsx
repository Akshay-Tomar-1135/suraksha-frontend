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
  const [phoneNum, setPhoneNum] = useState(user.phoneNum);
  const [email, setEmail] = useState(user.email);

  const [errors, setErrors] = useState({
    name: false,
    relation: false,
    phoneNum: false,
    email: false,
  });

  useEffect(() => {
    if (open) {
      setName(user.name);
      setRelation(user.relation);
      setPhoneNum(user.phoneNum);
      setEmail(user.email);
    }
  }, [open, user]);

  const handleClose = () => {
    setErrors({
      name: false,
      relation: false,
      phoneNum: false,
      email: false,
    });
    onClose();
  };

  const validateFields = () => {
    const newErrors = {
      name: name.trim() === '',
      relation: relation.trim() === '',
      phoneNum: phoneNum.trim() === '',
      email: email.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleEditUser = async () => {
    if (validateFields()) {
      try {
        
        const result = await userService.updateUserContact({
          old_phone_number: user.phoneNum,
          aadhaar_number: 123456789, // hardcoded for the time being
          name,
          relation,
          new_phone_number: phoneNum,
          email,
          status: user.status,
          priority: user.priority,
          latitude: user.latitude,
          longitude: user.longitude,
        });

        if (result.success) {
          showToast('User updated successfully', {severity: 'success'});
          onEditUser({ id: user.id, name, relation, phoneNum, email, status: user.status, latitude: user.latitude, longitude: user.longitude, priority: user.priority});
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
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
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
      sx={{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
            label="Relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            fullWidth
            required
            error={errors.relation}
            helperText={errors.relation ? 'Relation is required' : ''}
          />
          <TextField
            label="Phone Number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            fullWidth
            required
            error={errors.phoneNum}
            helperText={errors.phoneNum ? 'Phone Number is required' : ''}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={errors.email}
            helperText={errors.email ? 'Email is required' : ''}
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

  </>
  );
}
// confirm-delete-dialog.tsx
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from '@mui/material';
  
  type ConfirmDeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName?: string; // Optionally show the user's name
  };
  
  export function ConfirmDeleteDialog({
    open,
    onClose,
    onConfirm,
    userName,
  }: ConfirmDeleteDialogProps) {
    return (
      <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {userName ? `"${userName}"` : 'this user'}?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
  
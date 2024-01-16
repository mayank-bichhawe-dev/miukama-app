import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DialogActions } from '@mui/material';
import { Category } from '@/interfaces/confirmationBox';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmBox({ open, onClose, onSubmit }: Category) {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            ...style,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center">
            Are you sure to remove ?
          </Typography>
          <DialogActions>
            <Button onClick={onClose}>No</Button>
            <Button onClick={onSubmit}>Yes</Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
}

import { Typography } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface ModalButtonProps extends ButtonProps {
  modalTitle: string;
  modalContent: string;
  onConfirm: () => void;
}

export default function ModalButton({
  modalTitle,
  modalContent,
  onConfirm,
  ...buttonProps
}: ModalButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleClickOpen}>
        {buttonProps.children}
      </Button>
      <Dialog
        maxWidth={'sm'}
        open={open}
        PaperProps={{ sx: { borderRadius: '8px' } }}
      >
        <DialogTitle style={{ paddingTop: '28px', paddingBottom: '12px' }}>
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          <Typography component="pre" style={{ whiteSpace: 'pre-line' }}>
            {modalContent}
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: '12px' }}>
          <Button variant={'contained'} onClick={handleConfirm} autoFocus>
            OK
          </Button>
          <Button variant={'outlined'} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

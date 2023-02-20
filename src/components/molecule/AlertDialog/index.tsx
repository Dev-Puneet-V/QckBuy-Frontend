import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props: any) {
//   const [open, setOpen] = React.useState(false);
  const {
    handleClose,
    open,
    description,
    title, 
    handleConfirm
  } = props;


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color='error'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Go back</Button>
          <Button onClick={handleConfirm} autoFocus variant='contained' color='success'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
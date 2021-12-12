import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmModal ({ open, title = "¿Está usted seguro?", onConfirmCallback, onRefuseCallback }) {
    
    return (
        <Dialog
            open={open}            
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Quieres confirmar la acción? Está acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onRefuseCallback}>Rechazar</Button>
                <Button onClick={onConfirmCallback} autoFocus>Confirmar</Button>
            </DialogActions>
        </Dialog>        
    )

}
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const ModalWindow = ({action, actionTitle, actionWindow, closeWindow, token}) => {

    return (
        <Dialog open={true}>
            <DialogTitle>{actionTitle } токен</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <TextField
                        label="Стандартное текстовое поле"
                        variant="outlined"
                        fullWidth
                    />                    
                </DialogActions>
                <DialogActions>
                        <Button onClick={closeWindow}>отмена</Button>
                        {
                            token ? <Button onClick={() => actionWindow(token)}>{action}</Button>  : <Button onClick={actionWindow}>{action}</Button> 
                        }
                        {/* <Button onClick={actionWindow}>{action}</Button>                                             */}
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default ModalWindow
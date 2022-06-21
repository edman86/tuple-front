import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const LoginForm = ({ openLoginForm, handleCloseLoginForm, handleAddUser }) => {
    const [user, setUser] = useState('');

    const handleSignUp = () => {
        handleAddUser(user);
        setUser('');
    };

    return (
        <div>
            <Modal
                open={openLoginForm}
                onClose={handleCloseLoginForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Registration
                    </Typography>
                    <TextField 
                        id="outlined-basic" 
                        style={{marginTop: '10px'}}
                        label="User name" 
                        variant="outlined"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <Button 
                        variant="outlined"
                        style={{marginTop: '10px'}}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginForm;
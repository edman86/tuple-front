import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from '../../redux/slices/usersSlice';
import { Navigate } from "react-router-dom";

import styles from './Login.module.scss';

const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    
    const { 
        register, 
        handleSubmit, 
        setError,
        formState: { errors, isValid }, 
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (data.payload && data.payload.token) {
            localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />
    }
    
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Registration
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    className={styles.field} 
                    label="Username" 
                    error={Boolean(errors.username?.message)}
                    helperText={errors.username?.message}
                    {...register('username', {required: 'Username is required'})}    
                    fullWidth 
                />
                <TextField 
                    className={styles.field} 
                    label="E-Mail" 
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Email is required'})}
                    fullWidth 
                />
                <TextField 
                    className={styles.field} 
                    label="Password" 
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Password is required'})}
                    fullWidth 
                />
                <Button 
                    type="submit"
                    size="large" 
                    variant="contained"
                    disabled={!isValid}
                    fullWidth
                >
                    Sign up
                </Button>
            </form>
        </Paper>
    );
};

export default Registration;
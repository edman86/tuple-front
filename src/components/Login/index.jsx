import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from '../../redux/slices/usersSlice';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    
    const { 
        register, 
        handleSubmit, 
        setError,
        formState: { errors, isValid }, 
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values));

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
                Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    error={Boolean(errors.email?.message)}
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
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
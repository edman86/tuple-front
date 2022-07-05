import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from '../../redux/slices/usersSlice';
import { Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from "./Login.module.scss";

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Password cannot be less than 5 characters')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            const data = await dispatch(fetchUserData(values));
            if (data.error) {
                alert(data.error.message);
            }
            if (data.payload && data.payload.token) {
                localStorage.setItem('token', data.payload.token);
            }
        },
    });

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Sign in
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    className={styles.field}
                    id="email"
                    name="email"
                    label="Email"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    id="password"
                    name="password"
                    label="Password"
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
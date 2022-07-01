import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
    const isAuth = false;

    const onClickLogout = () => { };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>Tuple</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Add announcement</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Sign in</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
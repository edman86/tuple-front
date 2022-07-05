import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth, selectUserData } from '../../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';

const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();

    const logoutClickHandle = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

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
                                    <Button
                                        variant="contained"
                                    >
                                        Add announcement
                                    </Button>
                                </Link>
                                <Button
                                    onClick={logoutClickHandle}
                                    variant="outlined"
                                >
                                    Sign Out
                                </Button>
                                <div className={styles.userInfo}>
                                    <img className={styles.avatar} src={userData.avatarUrl || '/noavatar.png'} alt={userData.username} />
                                    <span className={styles.userName}>{userData.username}</span> 
                                </div>
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
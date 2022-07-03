import React, { useEffect } from 'react';
import Header from './components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from './components/Home';
import AnnouncementFullView from './components/AnnouncementFullView';
import AddAnnouncement from './components/AddAnnouncement';
import Login from './components/Login';
import Registration from './components/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; 
import { fetchMe, selectIsAuth } from './redux/slices/usersSlice';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchMe());
    }, []);
    
    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/posts/:id" element={<AnnouncementFullView />} />
                    <Route path="/posts/create" element={<AddAnnouncement />} />
                    <Route path="/posts/:id/edit" element={<AddAnnouncement />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;

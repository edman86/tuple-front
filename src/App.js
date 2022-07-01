import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from './components/Home';
import PostView from './components/PostView';
import AddAnnouncement from './components/AddAnnouncement';
import Login from './components/Login';
import Registration from './components/Registration';

import { Routes, Route } from 'react-router-dom'; 

function App() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/posts/:id" element={<PostView />} />
                    <Route path="/add-post" element={<AddAnnouncement />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;

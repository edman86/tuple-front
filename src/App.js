import { useState, useEffect } from 'react';
import MenuBar from './components/MenuBar';
import LoginForm from './components/LoginForm';
import axios from 'axios';

import './App.css';

function App() {
    const [announcements, setAnnouncements] = useState([]);
    const [openLoginForm, setOpenLoginForm] = useState(false);
    
    const handleOpenLoginForm = () => setOpenLoginForm(true);
    const handleCloseLoginForm = () => setOpenLoginForm(false);

    const handleAddUser = (username) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/add',
            data: {
                username: username,
            }
        });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/announcements')
            .then(res => setAnnouncements(res.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="App">
            <MenuBar 
                handleOpenLoginForm={handleOpenLoginForm}
            />
            <section className='announcements-list'>
                {announcements.map(announcement => {
                    return (
                        <div className='card'>
                            <img src={announcement.imageUrl} alt={announcement.title} />
                            <h3>{announcement.title}</h3>
                            <p>{announcement.description}</p>
                        </div>
                    );
                })}
            </section>
            <LoginForm 
                openLoginForm={openLoginForm}
                handleCloseLoginForm={handleCloseLoginForm}
                handleAddUser={handleAddUser}
            />
        </div>
    );
}

export default App;

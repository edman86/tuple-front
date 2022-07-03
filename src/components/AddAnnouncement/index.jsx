import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/usersSlice';
import axios from '../../axios';
import 'easymde/dist/easymde.min.css';

import styles from './AddAnnouncement.module.scss';

const AddAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = useRef(null);

    const isEditing = Boolean(id);

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.log(err);
        }
    };

    const removeImageHandle = () => {
        setImageUrl('');
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            
            const postData = {
                title,
                imageUrl,
                description
            }
            
            if (isEditing) {
                await axios.patch(`/posts/${id}`, postData);
                navigate(`/posts/${id}`);
            } else {
                const { data } = await axios.post('/posts', postData);
                const postId = data._id;
                navigate(`/posts/${postId}`);
            }

        } catch (err) {
            console.log(err);
            alert('Creating announcement error');
        }
    };

    // useCollback required for react-simplemde-editor lib
    const onChange = React.useCallback((value) => {
        setDescription(value);
    }, []);

    // useMemo required for react-simplemde-editor lib
    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then((res) => {
                    const { data } = res;
                    setTitle(data.title);
                    setDescription(data.description);
                    setImageUrl(data.imageUrl);
                })
        }
    }, []);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper style={{ padding: 30 }}>
            <Button
                variant="outlined"
                size="large"
                onClick={() => inputFileRef.current.click()}
            >
                Load image
            </Button>
            <input
                type="file"
                ref={inputFileRef}
                onChange={handleChangeFile}
                hidden
            />
            {imageUrl && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={removeImageHandle}
                    sx={{ 'marginLeft': '15px' }}
                >
                    Delete
                </Button>
            )}
            {imageUrl && (
                <img
                    className={styles.image}
                    src={`http://localhost:5000${imageUrl}`}
                    alt="Uploaded"
                />
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Announcement title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={description}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {isEditing ? 'Save' : 'Publish'}
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};

export default AddAnnouncement;
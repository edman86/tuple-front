import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/usersSlice';
import { updateAnnouncement } from '../../redux/slices/announcementsSlice';
import axios from '../../axios';
import 'easymde/dist/easymde.min.css';

import styles from './AddAnnouncement.module.scss';

const AddAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [adress, setAdress] = useState('');
    const inputFileRef = useRef(null);

    const dispatch = useDispatch();
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

    const handleCatecoryChange = (event) => {
        setCategory(event.target.value);
    };

    const removeImageHandle = () => {
        setImageUrl('');
    };

    const handleSetPhoneNumber = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async () => {
        if (!title) {
            alert('Please fill the title');
            return;
        }
        if (!description) {
            alert('Please fill the description');
            return;
        }
        if (!phoneNumber) {
            alert('Please fill the phoneNumber');
            return;
        }
        if (!category) {
            alert('Please fill the category');
            return;
        }
        
        try {
            const postData = {
                title,
                imageUrl,
                description,
                phoneNumber,
                category,
                adress
            }

            if (isEditing) {
                dispatch(updateAnnouncement({postData, id})).then(() => {
                    navigate(`/posts/${id}`);
                });
            } else {
                const { data } = await axios.post('/posts', postData);
                const postId = data._id;
                navigate(`/posts/${postId}`);
            }

        } catch (err) {
            alert(err);
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
                    setCategory(data.category);
                    setPhoneNumber(data.phoneNumber);
                    setAdress(data.adress);
                })
        }
    }, []);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />
    }

    return (
        <Paper style={{ padding: 30, maxWidth: 800, margin: '0 auto' }}>
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
                placeholder="Enter the title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <Box sx={{ minWidth: 120, marginTop: '25px'}}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={category}
                        label="Category"
                        onChange={handleCatecoryChange}
                    >
                        <MenuItem value={'Electronics'}>Electronics</MenuItem>
                        <MenuItem value={'Pets'}>Pets</MenuItem>
                        <MenuItem value={'Food'}>Food</MenuItem>
                        <MenuItem value={'Cars'}>Cars</MenuItem>
                        <MenuItem value={'Real estate'}>Real estate</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField
                label="Phone number"
                sx={{ 'marginTop': '25px' }} 
                value={phoneNumber}
                onChange={handleSetPhoneNumber}
                fullWidth
            />
            <TextField
                label="Adress"
                sx={{ 'marginTop': '25px' }}
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
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
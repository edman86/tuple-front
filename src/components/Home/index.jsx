import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Announcement from '../Announcement';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/slices/announcementsSlice';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const categories = [
    'All',
    'Electronics',
    'Pets',
    'Food',
    'Cars',
    'Real estate',
];

const Home = () => {
    const { announcements } = useSelector(state => state.announcements);
    const [category, setCategory] = React.useState('All');
    const dispatch = useDispatch();
    const userData = useSelector(state => state.users.userData);

    const isAnnouncementsLoading = announcements.status === 'loading';
    const isLoadingError = announcements.status === 'rejected';
    const errorMessage = announcements.error || '';

    const handleClick = (e) => {
        setCategory(e.target.innerText);
    };

    useEffect(() => {
        dispatch(fetchAnnouncements(category));
    }, [category]);

    if (isLoadingError) {
        return (
            <>
                <h2>{`Some error occured: ${errorMessage}`}</h2>
            </>
        );
    }

    return (
        <>
            <Stack direction="row" spacing={1} sx={{ 'marginBottom': '15px' }}>
                {categories.map((item, index) => {
                    return (
                        <Chip
                            key={index}
                            label={item}
                            variant={item === category ? "filled" : "outlined"}
                            onClick={handleClick}
                        />
                    );
                })}
            </Stack>

            <Grid container spacing={4}>
                {(isAnnouncementsLoading ? [...Array(5)] : announcements.posts).map((obj, i) => {
                    return isAnnouncementsLoading ?
                        (<Grid key={i} item xs={12} sm={6} md={4}>
                            <Announcement isLoading={true} />
                        </Grid>)
                        :
                        (<Grid key={obj._id} item xs={12} sm={6} md={4}>
                            <Announcement
                                id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                phoneNumber={obj.phoneNumber}
                                adress={obj.adress ? obj.adress : ''}
                                category={obj.category}
                                isEditable={userData && userData._id === obj.user._id}
                            />
                        </Grid>)
                })}
            </Grid>
        </>
    );
};

export default Home;
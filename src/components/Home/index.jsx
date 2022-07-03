import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Announcement from '../Announcement';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/slices/announcementsSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { announcements } = useSelector(state => state.announcements);
    const userData = useSelector(state => state.users.userData);

    const isAnnouncementsLoading = announcements.status === 'loading';

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, []);

    return (
        <>
            <Grid container spacing={4}>
                {(isAnnouncementsLoading ? [...Array(5)] : announcements.items).map((obj, i) => {
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
                                isEditable={userData && userData._id === obj.user._id}
                            />
                        </Grid>)
                })}
            </Grid>
        </>
    );
};

export default Home;
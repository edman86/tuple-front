import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import Announcement from '../Announcement';
import { TagsBlock } from '../TagsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements } from '../../redux/slices/announcementsSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { announcements, tags } = useSelector(state => state.announcements);

    const isAnnouncementsLoading = announcements.status === 'loading';

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, []);

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                <Tab label="New" />
                <Tab label="Most viewed" />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isAnnouncementsLoading ? [...Array(5)] : announcements.items).map((obj, i) =>
                        isAnnouncementsLoading ?
                            (<Announcement key={i} isLoading={true} />)
                            :
                            (<Announcement
                                id={1}
                                title={obj.title}
                                imageUrl={obj.imageUrl}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                tags={['lorem', 'ipsum', 'dolor']}
                                isEditable
                            />
                            ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={['lorem', 'ipsum', 'dolor']} isLoading={false} />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
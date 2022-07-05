import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchAnnouncements = createAsyncThunk(
    'announcements/fetchAnnouncements', async (param, {rejectWithValue}) => {
        try {
            let response;
            if (param && param.toLowerCase() === 'all') {
                response = await axios.get('/posts');
            } else {
                response = await axios.get(`/posts?category=${param}`);
            }
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteAnnouncement = createAsyncThunk(
    'announcements/deleteAnnouncement', async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.delete(`/posts/${id}`);
            if (response.ok) {
                dispatch(removePost(id));
            }
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateAnnouncement = createAsyncThunk(
    'announcements/updateAnnouncement', async ({ postData, id }, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`/posts/${id}`, postData);
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const setError = (state, action) => {
    state.announcements.status = 'rejected';
    state.announcements.error = action.payload;
};

const initialState = {
    announcements: {
        posts: [],
        status: 'loading',
        error: '' 
    },
};

const announcementsSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {
        removePost(state, action) {
            state.announcements.posts = state.announcements.posts
                .filter(post => post._id !== action.payload.id);
        },
    },
    extraReducers: {
        [fetchAnnouncements.pending]: (state) => {
            state.announcements.status = 'loading';
            state.announcements.posts = [];
        },
        [fetchAnnouncements.fulfilled]: (state, action) => {
            state.announcements.status = 'resolved';
            state.announcements.posts = action.payload;
        },
        [fetchAnnouncements.rejected]: setError,
        [deleteAnnouncement.rejected]: setError,
        [updateAnnouncement.rejected]: setError,
    }
});

export const announcementsReducer = announcementsSlice.reducer;
export const { removePost } = announcementsSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData', async (params) => {
        const response = await axios.post('/users/login', params);
        return response.data;
    }
);

export const fetchRegister = createAsyncThunk(
    'users/fetchRegister', async (params) => {
        const response = await axios.post('/users/register', params);
        return response.data;
    }
);

export const fetchMe = createAsyncThunk(
    'users/fetchMe', async () => {
        const response = await axios.get('/users/me');
        return response.data;
    }
);

const initialState = {
   userData: null,
   status: 'loading'
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.userData = null;
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.userData = null;
            state.status = 'loading';
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.userData = action.payload;
            state.status = 'loaded';
        },
        [fetchUserData.rejected]: (state) => {
            state.userData = null;
            state.status = 'error';
        },
        [fetchMe.pending]: (state) => {
            state.userData = null;
            state.status = 'loading';
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.userData = action.payload;
            state.status = 'loaded';
        },
        [fetchMe.rejected]: (state) => {
            state.userData = null;
            state.status = 'error';
        },
        [fetchRegister.pending]: (state) => {
            state.userData = null;
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.userData = action.payload;
            state.status = 'loaded';
        },
        [fetchRegister.rejected]: (state) => {
            state.userData = null;
            state.status = 'error';
        },
    }
});

export const usersReducer = usersSlice.reducer;

export const selectIsAuth = state => Boolean(state.users.userData);
export const selectUserData = state => state.users.userData; 

export const { logout } = usersSlice.actions;
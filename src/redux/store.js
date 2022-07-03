import { configureStore } from "@reduxjs/toolkit";
import { announcementsReducer } from "./slices/announcementsSlice";
import { usersReducer } from "./slices/usersSlice";

const store = configureStore({
    reducer: {
        announcements: announcementsReducer,
        users: usersReducer
    }
});

export default store;
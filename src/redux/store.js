import { configureStore } from "@reduxjs/toolkit";
import { announcementsReducer } from "./slices/announcementsSlice";

const store = configureStore({
    reducer: {
        announcements: announcementsReducer
    }
});

export default store;
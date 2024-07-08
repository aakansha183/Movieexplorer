
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/movieSlice';
import usersReducer from './slices/userSlice';
import commentsReducer from './slices/commentSlice';
import ratingReducer from './slices/ratingSlice';
const store = configureStore({
    reducer: {
        movies: moviesReducer,
        users: usersReducer,
        comments: commentsReducer,
        ratings: ratingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

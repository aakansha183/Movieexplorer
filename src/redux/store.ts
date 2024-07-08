
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/movieSlice';
import usersReducer from './slices/userSlice';
import commentsReducer from './slices/commentSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        users: usersReducer,
        comments: commentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

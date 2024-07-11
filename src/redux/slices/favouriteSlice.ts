import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
    favourites: { [userId: string]: string[] };
}

const initialState: FavouriteState = {
    favourites: {},
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<{ userId: string, movieId: string }>) => {
            const { userId, movieId } = action.payload;
            if (!state.favourites[userId]) {
                state.favourites[userId] = [];
            }
            state.favourites[userId].push(movieId);
        },
        removeFavourite: (state, action: PayloadAction<{ userId: string, movieId: string }>) => {
            const { userId, movieId } = action.payload;
            state.favourites[userId] = state.favourites[userId].filter(id => id !== movieId);
        },
        setFavourites: (state, action: PayloadAction<{ userId: string, favourites: string[] }>) => {
            const { userId, favourites } = action.payload;
            state.favourites[userId] = favourites;
        }
    },
});

export const { addFavourite, removeFavourite, setFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;

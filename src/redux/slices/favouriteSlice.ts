// src/slices/favouriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
    favourites: string[]; 
}

const initialState: FavouriteState = {
    favourites: [],
};

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<string>) => {
            state.favourites.push(action.payload);
        },
        removeFavourite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter(id => id !== action.payload);
        },
    },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;

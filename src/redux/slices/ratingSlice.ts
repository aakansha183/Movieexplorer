// src/redux/slices/ratingSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rating } from '../../types/Rating';

interface RatingState {
    ratings: Rating[];
}

const initialState: RatingState = {
    ratings: [],
};

const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        addRating: (state, action: PayloadAction<Rating>) => {
            const existingRating = state.ratings.find(
                (r) => r.movieId === action.payload.movieId && r.userId === action.payload.userId
            );
            if (existingRating) {
                existingRating.rating = action.payload.rating;
            } else {
                state.ratings.push(action.payload);
            }
        },
        setRatings: (state, action: PayloadAction<Rating[]>) => {
            state.ratings = action.payload;
        },
    },
});

export const { addRating, setRatings } = ratingSlice.actions;
export default ratingSlice.reducer;

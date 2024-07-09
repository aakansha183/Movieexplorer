// src/redux/slices/movieSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/Movie';

interface MovieState {
    movies: Movie[];
    favorites: Movie[];
}

const initialState: MovieState = {
    movies: [],
    favorites: [],
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
        },
        addToFavorites(state, action: PayloadAction<Movie>) {
            if (!state.favorites.find(movie => movie.imdbID === action.payload.imdbID)) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites(state, action: PayloadAction<Movie>) {
            state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload.imdbID);
        },
        clearFavorites(state) {
            state.favorites = [];
        },
    },
});

export const { setMovies, addToFavorites, removeFromFavorites, clearFavorites } = movieSlice.actions;
export default movieSlice.reducer;

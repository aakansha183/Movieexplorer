import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

interface MoviesState {
    movies: Movie[];
    favorites: Movie[];
}

const initialState: MoviesState = {
    movies: [],
    favorites: [],
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        addToFavorites: (state, action: PayloadAction<Movie>) => {
            const movie = action.payload;
            if (!state.favorites.some(fav => fav.imdbID === movie.imdbID)) {
                state.favorites.push(movie);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<Movie>) => {
            state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload.imdbID);
        },
    },
});

export const { setMovies, addToFavorites, removeFromFavorites } = movieSlice.actions;

export default movieSlice.reducer;

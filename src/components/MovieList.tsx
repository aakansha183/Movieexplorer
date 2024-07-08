// MovieList.tsx
import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';

interface MovieListProps {
    movies: Movie[];
    favorites?: string[];
}

const MovieList: React.FC<MovieListProps> = ({ movies, favorites = [] }) => (
    <div>
        {movies.map(movie => (
            <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                isFavorite={favorites.includes(movie.imdbID)} 
            />
        ))}
    </div>
);

export default MovieList;

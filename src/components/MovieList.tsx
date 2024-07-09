import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/Movie';

interface MovieListProps {
    movies: Movie[];
    favorites?: string[];
    onRemoveFromFavorites?: (movie: Movie) => void; 
}

const MovieList: React.FC<MovieListProps> = ({ movies, favorites = [], onRemoveFromFavorites }) => (
    <div>
        {movies.map(movie => (
            <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                isFavorite={favorites.includes(movie.imdbID)} 
                onRemoveFromFavorites={onRemoveFromFavorites ? () => onRemoveFromFavorites(movie) : undefined} 
            />
        ))}
    </div>
);

export default MovieList;

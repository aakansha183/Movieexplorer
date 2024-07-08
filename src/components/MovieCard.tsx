import React from 'react';
import { useDispatch } from 'react-redux';
import { Movie } from '../types/Movie';
import { addToFavorites, removeFromFavorites } from '../redux/slices/movieSlice';
import { Link } from 'react-router-dom'; 
import './MovieCard.css'; 

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite }) => {
    const dispatch = useDispatch();

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    return (
        <div className="movie-card">
            <div className="poster-container">
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            </div>
            <div className="details-container">
                <h2>{movie.Title}</h2>
                <p>{movie.Plot}</p>
                <p>Director: {movie.Director}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Genre: {movie.Genre}</p>
                <p>Released: {movie.Released}</p>
                <p>Runtime: {movie.Runtime}</p>
                
                <Link to={`/movie/${movie.imdbID}`} className="movie-detail-button">
                    Show Movie Details
                </Link>
                <button
                    className={`favorite-button ${isFavorite ? 'remove' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;

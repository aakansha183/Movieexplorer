// src/components/MovieCard.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Movie } from '../types/Movie';
import { addToFavorites, removeFromFavorites } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom'; 
import { Button, Card, CardActions, CardContent, Typography, Grid } from '@mui/material'; 
import './MovieCard.css'; 

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    onRemoveFromFavorites?: () => void; 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
        }
    };

    return (
        <Card className="movie-card">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <div className="poster-container">
                        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent className="details-container">
                        <Typography variant="h5" component="h2">
                            {movie.Title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {movie.Plot}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Director: {movie.Director}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Actors: {movie.Actors}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genre: {movie.Genre}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Released: {movie.Released}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Runtime: {movie.Runtime}
                        </Typography>
                        <Link to={`/movie/${movie.imdbID}`} className="movie-detail-button">
                            Show Movie Details
                        </Link>
                        <CardActions>
                            {currentUser && (
                                <Button
                                    className="favorite-button"
                                    onClick={handleFavoriteClick}
                                >
                                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </Button>
                            )}
                        </CardActions>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default MovieCard;


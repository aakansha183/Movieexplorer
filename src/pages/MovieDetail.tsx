import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Container, Typography } from '@mui/material';
import CommentSection from '../components/CommentSection';
import RatingComponent from '../components/RatingComponent';
import { setRatings } from '../redux/slices/ratingSlice';
import localForage from 'localforage';
import { Rating as RatingType } from '../types/Rating';
import './MovieDetail.css';

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const movie = useSelector((state: RootState) => state.movies.movies.find((movie) => movie.imdbID === id));
    const ratings = useSelector((state: RootState) => state.ratings.ratings.filter((r) => r.movieId === id));

    useEffect(() => {
        const loadRatings = async () => {
            try {
                const storedRatings = await localForage.getItem<RatingType[]>('ratings') || [];
                dispatch(setRatings(storedRatings));
            } catch (error) {
                console.error('Error loading ratings from localForage:', error);
            }
        };

        loadRatings();
    }, [dispatch]);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const averageRating = ratings.length > 0
        ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
        : 'No ratings yet';

    return (
        <Container className="root">
            <div className="movie-info">
                <img src={movie.Poster} alt={movie.Title} className="poster" />
                <div className="details">
                    <Typography variant="h2">{movie.Title}</Typography>
                    <Typography variant="body1">{movie.Plot}</Typography>
                    <Typography variant="body1">Director: {movie.Director}</Typography>
                    <Typography variant="body1">Actors: {movie.Actors}</Typography>
                    <Typography variant="body1">Genre: {movie.Genre}</Typography>
                    <Typography variant="body1">Year: {movie.Year}</Typography>
                    <Typography variant="body1">Rating: {movie.imdbRating}</Typography>
                </div>
            </div>
            
            <div className="ratings-section">
                <Typography variant="h6">User Rating: {averageRating}</Typography>
                <ul className="rating-list">
                    {ratings.map((rating) => (
                        <li key={rating.id} className="rating-item">
                            {rating.username}: {rating.rating}
                        </li>
                    ))}
                </ul>
                <RatingComponent movieId={movie.imdbID} />
            </div>
            
            <div className="comments-section">
                <CommentSection movieId={movie.imdbID} />
            </div>
        </Container>
    );
};

export default MovieDetail;



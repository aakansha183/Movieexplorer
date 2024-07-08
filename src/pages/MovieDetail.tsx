// MovieDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Container, Typography } from '@mui/material';
import CommentSection from '../components/CommentSection';

const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movie = useSelector((state: RootState) => state.movies.movies.find((movie) => movie.imdbID === id));

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Container>
            <Typography variant="h2">{movie.Title}</Typography>
            <img src={movie.Poster} alt={movie.Title} />
            <Typography variant="body1">{movie.Plot}</Typography>
            <Typography variant="body1">Director: {movie.Director}</Typography>
            <Typography variant="body1">Actors: {movie.Actors}</Typography>
            <Typography variant="body1">Genre: {movie.Genre}</Typography>
            <Typography variant="body1">Year: {movie.Year}</Typography>
            <Typography variant="body1">Rating: {movie.imdbRating}</Typography>
            <CommentSection movieId={movie.imdbID} />
        </Container>
    );
};

export default MovieDetail;

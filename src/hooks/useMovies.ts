import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../redux/slices/movieSlice';
import axios from 'axios';
import { RootState } from '../redux/store';

export const useMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await axios.get('/json/movies.json');
            dispatch(setMovies(response.data));
        };
        fetchMovies();
    }, [dispatch]);

    return movies;
};

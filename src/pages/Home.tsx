import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../redux/slices/movieSlice';
import MovieList from '../components/MovieList';
import { RootState } from '../redux/store';
import { fetchMoviesFromJSON } from '../utils';

interface HomeProps {
    searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const movies = useSelector((state: RootState) => state.movies.movies);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMoviesFromJSON();
                dispatch(setMovies(data));
            } catch (error) {
                console.error('Error fetching movies:', (error as Error).message);
                setError('Failed to fetch movies. Please try again later.');
            }
        };

        fetchData();
    }, [dispatch]);

    const filteredMovies = movies.filter(movie =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: '0.5rem' }}></h1>
            <MovieList movies={filteredMovies} />
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../redux/slices/movieSlice';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { RootState } from '../redux/store';
import { fetchMoviesFromJSON } from '../utils';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredMovies = movies.filter(movie =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <h1>Home</h1>
            <MovieList movies={filteredMovies} />
        </div>
    );
};

export default Home;

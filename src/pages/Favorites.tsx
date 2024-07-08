// pages/Favorites.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Favorites: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const favorites = useSelector((state: RootState) => state.movies.favorites);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredFavorites = favorites.filter(favorite =>
        favorite.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <h1>Favorites</h1>
            {filteredFavorites.length > 0 ? (
                filteredFavorites.map(favorite => (
                    <MovieCard
                        key={favorite.imdbID}
                        movie={favorite}
                        isFavorite={true}
                    />
                ))
            ) : (
                <p>No movies found</p>
            )}
        </div>
    );
};

export default Favorites;

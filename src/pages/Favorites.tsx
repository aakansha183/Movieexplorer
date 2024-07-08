import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import useFavorites from '../hooks/useFavorites';
import { Movie } from '../types/Movie';

const Favorites: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

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
                <MovieList 
                    movies={filteredFavorites} 
                    favorites={favorites.map(favorite => favorite.imdbID)}
                    onRemoveFromFavorites={removeFromFavorites} 
                />
            ) : (
                <p>No movies found</p>
            )}
        </div>
    );
};

export default Favorites;

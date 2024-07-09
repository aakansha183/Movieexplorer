import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import useFavorites from '../hooks/useFavorites';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Favorites: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const { favorites, removeFromFavorites } = useFavorites(currentUser);

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


import MovieList from '../components/MovieList';
import useFavorites from '../hooks/useFavorites';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface FavoritesProps {
    searchQuery: string;
}

const Favorites: React.FC<FavoritesProps> = ({ searchQuery }) => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const { favorites, removeFromFavorites } = useFavorites(currentUser);

    const filteredFavorites = favorites.filter(favorite =>
        favorite.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
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

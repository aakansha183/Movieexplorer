import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';
import { RootState } from '../redux/store';
import { Movie } from '../types/Movie';
import { addToFavorites, removeFromFavorites } from '../redux/slices/movieSlice';
import { User } from '../types/User';

const useFavorites = (currentUser: User | null) => {
    const [persistedFavorites, setPersistedFavorites] = useState<Movie[]>([]);
    const favorites = useSelector((state: RootState) => state.movies.favorites);
    const dispatch = useDispatch();

   
    useEffect(() => {
        const loadFavoritesFromLocalForage = async () => {
            try {
                const storedFavorites = await localforage.getItem<Movie[]>('favorites');
                if (storedFavorites !== null) {
                    setPersistedFavorites(storedFavorites);
                }
            } catch (error) {
                console.error('Error loading favorites from local storage:', error);
            }
        };

        loadFavoritesFromLocalForage();
    }, []);

    
    useEffect(() => {
        const saveFavoritesToLocalForage = async () => {
            try {
                await localforage.setItem('favorites', favorites);
                setPersistedFavorites(favorites);
            } catch (error) {
                console.error('Error saving favorites to local storage:', error);
            }
        };

        saveFavoritesToLocalForage();
    }, [favorites]);

   
    const addToFavoritesHandler = (movie: Movie) => {
        if (currentUser) {
            dispatch(addToFavorites(movie));
        } else {
            alert('Please login to add items to favorites.');
        }
    };

    
    const removeFromFavoritesHandler = (movie: Movie) => {
        if (currentUser) {
            dispatch(removeFromFavorites(movie));
        } else {
            alert('Please login to remove items from favorites.');
        }
    };

    return {
        favorites: persistedFavorites,
        addToFavorites: addToFavoritesHandler,
        removeFromFavorites: removeFromFavoritesHandler,
    };
};

export default useFavorites;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addRating, setRatings } from '../redux/slices/ratingSlice';
import { Rating as RatingType } from '../types/Rating';
import localForage from 'localforage';
import { Button, Rating } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


interface RatingComponentProps {
    movieId: string;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ movieId }) => {
    const [rating, setRating] = useState<number | null>(0);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const ratings = useSelector((state: RootState) => state.ratings.ratings);

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

    const handleAddRating = async () => {
        if (currentUser && rating) {
            const newRating: RatingType = {
                id: uuidv4(),
                movieId,
                userId: currentUser.id,
                username: currentUser.username,
                rating,
            };
            const updatedRatings = [...ratings.filter((r) => r.id !== newRating.id), newRating];
            await localForage.setItem('ratings', updatedRatings);
            dispatch(addRating(newRating));
        }
    };

    return (
        <div className="rating-component-root">
            {currentUser ? (
                <div className="rating-box">
                    <Rating
                        name="movie-rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        size="large"
                    />
                    <Button onClick={handleAddRating} variant="contained" color="primary" className="rating-button">
                        Submit Rating
                    </Button>
                </div>
            ) : (
                <p>Please log in to rate this movie.</p>
            )}
        </div>
    );
};

export default RatingComponent;


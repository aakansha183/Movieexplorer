import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addComment } from '../redux/slices/commentSlice';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface CommentSectionProps {
    movieId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ movieId }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const comments = useSelector((state: RootState) => state.comments.comments.filter((c) => c.movieId === movieId));
    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    const handleAddComment = () => {
        if (currentUser) {
            const newComment = { id: uuidv4(), movieId, text: comment, userId: currentUser.id };
            dispatch(addComment(newComment));
            setComment('');
        }
    };

    return (
        <div>
            <List>
                {comments.map((c: { text: string }, index: number) => (
                    <ListItem key={index}>
                        <ListItemText primary={c.text} />
                    </ListItem>
                ))}
            </List>
            {currentUser && (
                <div>
                    <TextField
                        label="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Button onClick={handleAddComment} variant="contained" color="primary">
                        Add Comment
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;



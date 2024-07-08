
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addComment, setComments } from '../redux/slices/commentSlice';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import localForage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../types/Comment';


interface CommentSectionProps {
    movieId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ movieId }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const comments = useSelector((state: RootState) => state.comments.comments.filter((c) => c.movieId === movieId));
    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    useEffect(() => {
        const loadComments = async () => {
            const storedComments = await localForage.getItem<Comment[]>('comments') || [];
            dispatch(setComments(storedComments));
        };

        loadComments();
    }, [dispatch]);

    const handleAddComment = async () => {
        if (currentUser) {
            const newComment: Comment = {
                id: uuidv4(),
                movieId,
                text: comment,
                userId: currentUser.id,
                username: currentUser.username,
            };
            dispatch(addComment(newComment));
            const updatedComments = [...comments, newComment];
            await localForage.setItem('comments', updatedComments);
            setComment('');
        }
    };

    return (
        <div className="comment-section-root">
            <List className="comment-list">
                {comments.map((c: Comment) => (
                    <ListItem key={c.id}>
                        <ListItemText primary={c.text} secondary={c.username} />
                    </ListItem>
                ))}
            </List>
            {currentUser && (
                <div className="comment-form">
                    <TextField
                        label="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Button onClick={handleAddComment} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                        Add Comment
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;




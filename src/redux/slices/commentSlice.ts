import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

interface CommentState {
    comments: Comment[];
}

const initialState: CommentState = {
    comments: [],
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        setComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
        },
    },
});

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;


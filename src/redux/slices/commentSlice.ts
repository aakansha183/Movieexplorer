import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
    id: string;
    movieId: string;
    userId: string;
    text: string;
}

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
    },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;

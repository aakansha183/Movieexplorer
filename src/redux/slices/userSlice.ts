// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { clearFavorites } from './movieSlice';

interface UserState {
    users: User[];
    currentUser: User | null;
}

const initialState: UserState = {
    users: [],
    currentUser: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        registerUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload;
        },
        logout(state) {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearFavorites, (state) => {
            state.currentUser = null;
        });
    }
});

export const { registerUser, setUser, logout } = userSlice.actions;
export default userSlice.reducer;

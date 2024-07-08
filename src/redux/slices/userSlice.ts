import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

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
        }
    }
});

export const { registerUser, setUser } = userSlice.actions;
export default userSlice.reducer;

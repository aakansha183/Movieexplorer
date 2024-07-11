import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { clearFavorites } from './movieSlice';

interface UserState {
    users: User[];
    currentUser: User | null;
}

const getUserFromLocalStorage = (): User | null => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: UserState = {
    users: [],
    currentUser: getUserFromLocalStorage(),
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
            if (action.payload) {
                localStorage.setItem('currentUser', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
        },
        logout(state) {
            state.currentUser = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearFavorites, (state) => {
            state.currentUser = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        });
    }
});

export const { registerUser, setUser, logout } = userSlice.actions;
export default userSlice.reducer;


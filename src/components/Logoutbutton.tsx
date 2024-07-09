// src/components/LogoutButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { clearFavorites } from '../redux/slices/movieSlice';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearFavorites());
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
};

export default LogoutButton;

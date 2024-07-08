
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar: React.FC = () => {
    const { currentUser, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 'auto' }}>
                    Movie Explorer
                </Typography>
                <Button component={Link} to="/" color="inherit">
                    Home
                </Button>
                <Button component={Link} to="/favorites" color="inherit">
                    Favorites
                </Button>
                {currentUser ? (
                    <>
                        <Button onClick={logout} color="inherit">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/login" color="inherit">
                            Login
                        </Button>
                        <Button component={Link} to="/register" color="inherit">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

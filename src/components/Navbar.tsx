import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearFavorites } from '../redux/slices/movieSlice';
import SearchBar from '../components/SearchBar';

interface NavbarProps {
    onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const { currentUser, logout } = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(clearFavorites());
        logout();
    };

    const showSearchBar = location.pathname === '/' || location.pathname === '/favorites';

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                   
                    <Grid item xs={8} md={3}>
                        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Movie Explorer
                        </Typography>
                    </Grid>

                  
                    {showSearchBar && (
                        <Grid item xs={12} md={6}>
                            <SearchBar onSearch={onSearch} />
                        </Grid>
                    )}

                  
                    <Grid item xs={4} md={3} container justifyContent="flex-end" spacing={2}>
                        
                        <Grid item>
                            <Button component={Link} to="/" color="inherit">
                                Home
                            </Button>
                        </Grid>

                       
                        {currentUser && (
                            <Grid item>
                                <Button component={Link} to="/favorites" color="inherit">
                                    Favorites
                                </Button>
                            </Grid>
                        )}

                       
                        <Grid item>
                            {currentUser ? (
                                <Button onClick={handleLogout} color="inherit">
                                    Logout
                                </Button>
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
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

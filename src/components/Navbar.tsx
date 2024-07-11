import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Menu, MenuItem, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
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
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Adjusted breakpoint to 'md' for better responsiveness

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                        {isSmallScreen ? (
                            <>
                                <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                                    {currentUser && <MenuItem component={Link} to="/favorites" onClick={handleMenuClose}>Favorites</MenuItem>}
                                    {currentUser ? (
                                        <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Logout</MenuItem>
                                    ) : (
                                        <>
                                            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
                                            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>Register</MenuItem>
                                        </>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;


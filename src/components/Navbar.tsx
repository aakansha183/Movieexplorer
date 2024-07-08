import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar: React.FC = () => {
    const { currentUser, logout } = useAuth();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={8} md={3}>
                        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Movie Explorer
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={9} container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                            <Button component={Link} to="/" color="inherit">
                                Home
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to="/favorites" color="inherit">
                                Favorites
                            </Button>
                        </Grid>
                        {currentUser ? (
                            <Grid item>
                                <Button onClick={logout} color="inherit">
                                    Logout
                                </Button>
                            </Grid>
                        ) : (
                            <>
                                <Grid item>
                                    <Button component={Link} to="/login" color="inherit">
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button component={Link} to="/register" color="inherit">
                                        Register
                                    </Button>
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


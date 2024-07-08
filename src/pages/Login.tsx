import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const success = await login(values.username, values.password);
                if (success) {
                    navigate('/');
                } else {
                    setError('Invalid username or password');
                }
            } catch (error: any) {
                setError(error.message || 'An error occurred during login.');
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ marginTop: '1rem' }}
                >
                    Login
                </Button>
                {error && (
                    <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
                        {error}
                    </Typography>
                )}
                <Grid container justifyContent="center" style={{ marginTop: '1rem' }}>
                    <Grid item>
                        <Link component="button" variant="body2" onClick={() => navigate('/register')}>
                            Don't have an account? Register
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;

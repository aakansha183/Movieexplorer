
import * as yup from 'yup';

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default registerSchema;

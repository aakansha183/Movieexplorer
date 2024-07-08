import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/userSlice';
import { User } from '../types/User';
import * as yup from 'yup';

interface AuthState {
    currentUser: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (newUser: User) => void;
}

const useAuth = (): AuthState => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            await loginSchema.validate({ username, password }, { abortEarly: false });

            
            const storedUsers = localStorage.getItem('users');
            const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

            const user = parsedUsers.find(u => u.username === username && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                dispatch(setUser(user));
                return true;
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error: any) {
            console.error('Login error:', error.message || error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        dispatch(setUser(null));
    };

    const register = (newUser: User) => {
        
        const storedUsers = localStorage.getItem('users');
        const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        
        parsedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(parsedUsers));

        
        console.log('Registered new user:', newUser);

        
        dispatch({ type: 'ADD_USER', payload: newUser });
    };

    return { currentUser, login, logout, register };
};

export default useAuth;

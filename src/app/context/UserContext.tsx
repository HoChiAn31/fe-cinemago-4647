'use client';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse, User, UserContextType } from '../types';
import customAxios from '@/app/utils/axios';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'; // Import cookies-next

// Define custom JWT payload interface
interface CustomJwtPayload extends JwtPayload {
	id: string;
	role: string;
	email: string;
}

// Create Auth context with default values
export const AuthContext = createContext<UserContextType>({
	isLogin: false,
	setIsLogin: () => {},
	role: '',
	setRole: () => {},
	isLoading: false,
	setIsLoading: () => {},
	login: async () => {},
	logout: () => {},
	user: null,
});

interface AuthProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [role, setRole] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>({
		id: '',
		role: '',
		email: '',
	});
	const [roleBc, setRoleBc] = useState<string>();
	const router = useRouter();
	const locale = useLocale();
	// Check token and fetch user data on page load
	useEffect(() => {
		const initializeAuth = async () => {
			const token = getCookie('access_token'); // Get access token from cookies
			if (token) {
				try {
					setIsLoading(true);
					const response = jwtDecode<CustomJwtPayload>(token);
					console.log(response);
					const userData: User = {
						id: response.id, // Ensure these properties exist in your decoded token
						role: response.role,
						email: response.email,
					};
					setUser(userData);
					setIsLogin(true);
					setRole(response.role);
					setRoleBc(response.role);
				} catch (error) {
					console.error('Error fetching user data:', error);
					// Remove cookies on error
					deleteCookie('access_token');
					deleteCookie('refresh_token');
					// setUser(null);
					setIsLogin(false);
					setRole('');
				}
			}
			setIsLoading(false);
		};
		initializeAuth();
	}, []);

	useEffect(() => {
		if (role === 'admin' || role === 'staff') {
			router.push(`/${locale}/admin`);
		} else if (role === '' && (roleBc === 'admin' || roleBc === 'staff')) {
			router.push(`/${locale}`);
			setRoleBc('');
		}
	}, [role, roleBc]);

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			console.log('email', email);
			console.log('password', password);

			const response = await axios.post('http://localhost:5000/auth/login', {
				email,
				password,
			});

			const { access_token, refreshToken, user: userData } = response.data;
			const decodedToken = jwtDecode<CustomJwtPayload>(refreshToken);

			// Set cookies using cookies-next
			setCookie('access_token', access_token, {
				maxAge: 7 * 24 * 3600, // Set cookie expiration time (in seconds)
				secure: true,
				path: '/',
			});
			setCookie('refresh_token', refreshToken, {
				maxAge: 30 * 24 * 3600, // Set cookie expiration time (in seconds)
				secure: true,
				path: '/',
			});

			setUser(userData);
			setIsLogin(true);
			setRole(decodedToken.role);
			setRoleBc(decodedToken.role);
		} catch (error) {
			console.error('Login failed:', error);
			throw error; // Rethrow to handle in component
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		// Remove cookies using cookies-next
		deleteCookie('access_token');
		deleteCookie('refresh_token');
		setUser(null);
		setIsLogin(false);
		setRole('');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLogin,
				setIsLogin,
				role,
				setRole,
				isLoading,
				setIsLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to access the Auth context
export const useUser = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

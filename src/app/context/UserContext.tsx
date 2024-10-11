// 'use client';

// import Cookies from 'js-cookie';
// import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
// import { AuthResponse, User, UserContextType } from '../types';
// import axios from '@/app/utils/axios';
// import { useRouter } from 'next/navigation';
// import { useLocale } from 'next-intl';
// import { jwtDecode, JwtPayload } from 'jwt-decode';

// // interface UserContextType {
// // 	isLogin: boolean;
// // 	setIsLogin: (value: boolean) => void;
// // 	role: string;
// // 	setRole: (value: string) => void;
// // 	isLoading: boolean;
// // 	  login:  () => {},
// //   logout: () => {},
// // }

// // const UserContext = createContext<UserContextType | undefined>(undefined);

// // export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// // 	const [isLogin, setIsLogin] = useState(false);
// // 	const [role, setRole] = useState('');
// // 	const [isLoading, setIsLoading] = useState(true);

// // 	useEffect(() => {
// // 		const checkLoginStatus = () => {
// // 			if (typeof window !== 'undefined') {
// // 				const storedIsLogin = localStorage.getItem('isLogin') === 'true';
// // 				const storedRole = localStorage.getItem('userRole') || '';
// // 				setIsLogin(storedIsLogin);
// // 				setRole(storedRole);
// // 				setIsLoading(false);
// // 			}
// // 		};

// // 		checkLoginStatus();
// // 	}, []);

// // 	const setIsLoginAndStore = (value: boolean) => {
// // 		setIsLogin(value);
// // 		localStorage.setItem('isLogin', value.toString());
// // 	};

// // 	const setRoleAndStore = (newRole: string) => {
// // 		setRole(newRole);
// // 		localStorage.setItem('userRole', newRole);
// // 	};

// // 	return (
// // 		<UserContext.Provider
// // 			value={{ isLogin, setIsLogin: setIsLoginAndStore, role, setRole: setRoleAndStore, isLoading }}
// // 		>
// // 			{children}
// // 		</UserContext.Provider>
// // 	);
// // };

// // export const useUser = () => {
// // 	const context = useContext(UserContext);
// // 	if (context === undefined) {
// // 		throw new Error('useUser must be used within a UserProvider');
// // 	}
// // 	return context;
// // };
// interface CustomJwtPayload extends JwtPayload {
// 	role: string;
// }
// export const AuthContext = createContext<UserContextType>({
// 	isLogin: false,
// 	setIsLogin: () => {},
// 	role: '',
// 	setRole: () => {},
// 	isLoading: false,
// 	setIsLoading: () => {},
// 	login: async () => {},
// 	logout: () => {},
// });

// interface AuthProviderProps {
// 	children: ReactNode;
// }

// export const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
// 	const [isLogin, setIsLogin] = useState<boolean>(false);
// 	const [role, setRole] = useState<string>('');
// 	const [isLoading, setIsLoading] = useState<boolean>(true);
// 	const [user, setUser] = useState<User | null>(null);
// 	console.log('Access token:', Cookies.get('access_token'));
// 	console.log('Refresh token:', Cookies.get('refresh_token'));
// 	// Kiểm tra token khi tải lại trang
// 	useEffect(() => {
// 		const initializeAuth = async () => {
// 			const token = Cookies.get('access_token');
// 			if (token) {
// 				try {
// 					setIsLoading(true);
// 					const response = await axios.get<User>('/api/users/me');
// 					setUser(response.data);
// 					setIsLogin(true);
// 					setRole(response.data.role);
// 				} catch (error) {
// 					console.error('Error fetching user data:', error);
// 					Cookies.remove('access_token');
// 					Cookies.remove('refresh_token');
// 					setUser(null);
// 					setIsLogin(false);
// 					setRole('');
// 				}
// 			}
// 			setIsLoading(false);
// 		};

// 		initializeAuth();
// 	}, []);

// 	const login = async (email: string, password: string) => {
// 		try {
// 			setIsLoading(true);
// 			console.log('email', email);
// 			console.log('password', password);

// 			const response = await axios.post('http://localhost:5000/auth/login', {
// 				email,
// 				password,
// 			});
// 			console.log('129:', response.data);
// 			const { access_token, refreshToken, user: userData } = response.data;
// 			const decodedToken = jwtDecode<CustomJwtPayload>(refreshToken);
// 			Cookies.set('access_token', access_token, {
// 				expires: 7 * 24 * 3600 * 1000,
// 				// httpOnly: true,
// 				secure: true,
// 				path: '/',
// 			});
// 			Cookies.set('refresh_token', refreshToken, {
// 				expires: 30 * 24 * 3600 * 1000,
// 				// httpOnly: true,
// 				secure: true,
// 				path: '/',
// 			});

// 			setUser(userData);
// 			setIsLogin(true);
// 			setRole(decodedToken.role);
// 			// router.push(`/${locale}`);
// 		} catch (error) {
// 			console.error('Login failed:', error);
// 			throw error; // Rethrow để xử lý ở component
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
// 	console.log(isLogin);

// 	const logout = () => {
// 		Cookies.remove('access_token');
// 		Cookies.remove('refresh_token');
// 		setUser(null);
// 		setIsLogin(false);
// 		setRole('');
// 	};

// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				isLogin,
// 				setIsLogin,
// 				role,
// 				setRole,
// 				isLoading,
// 				setIsLoading,
// 				login,
// 				logout,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
// export const useUser = () => {
// 	const context = useContext(AuthContext);
// 	if (context === undefined) {
// 		throw new Error('useUser must be used within a UserProvider');
// 	}
// 	return context;
// };
// 'use server';
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
	role: string;
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
});

interface AuthProviderProps {
	children: ReactNode;
}

export const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [role, setRole] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);

	console.log('Access token:', getCookie('access_token'));
	console.log('Refresh token:', getCookie('refresh_token'));
	// Check token and fetch user data on page load
	useEffect(() => {
		const initializeAuth = async () => {
			const token = getCookie('access_token'); // Get access token from cookies
			// if (token) {
			// 	// Check if token is defined
			// 	console.log(jwtDecode<CustomJwtPayload>(token)); // Only decode if token is valid
			// } else {
			// 	console.error('Access token is undefined'); // Handle the undefined case
			// }
			if (token) {
				try {
					setIsLoading(true);
					const response = jwtDecode<CustomJwtPayload>(token);
					// setUser(response.data);
					setIsLogin(true);
					setRole(response.role);
				} catch (error) {
					console.error('Error fetching user data:', error);
					// Remove cookies on error
					deleteCookie('access_token');
					deleteCookie('refresh_token');
					setUser(null);
					setIsLogin(false);
					setRole('');
				}
			}
			setIsLoading(false);
		};
		initializeAuth();
	}, []);

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

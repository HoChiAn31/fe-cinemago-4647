'use client';

import Cookies from 'js-cookie';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse, User, UserContextType } from '../types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// interface UserContextType {
// 	isLogin: boolean;
// 	setIsLogin: (value: boolean) => void;
// 	role: string;
// 	setRole: (value: string) => void;
// 	isLoading: boolean;
// 	  login:  () => {},
//   logout: () => {},
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// 	const [isLogin, setIsLogin] = useState(false);
// 	const [role, setRole] = useState('');
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		const checkLoginStatus = () => {
// 			if (typeof window !== 'undefined') {
// 				const storedIsLogin = localStorage.getItem('isLogin') === 'true';
// 				const storedRole = localStorage.getItem('userRole') || '';
// 				setIsLogin(storedIsLogin);
// 				setRole(storedRole);
// 				setIsLoading(false);
// 			}
// 		};

// 		checkLoginStatus();
// 	}, []);

// 	const setIsLoginAndStore = (value: boolean) => {
// 		setIsLogin(value);
// 		localStorage.setItem('isLogin', value.toString());
// 	};

// 	const setRoleAndStore = (newRole: string) => {
// 		setRole(newRole);
// 		localStorage.setItem('userRole', newRole);
// 	};

// 	return (
// 		<UserContext.Provider
// 			value={{ isLogin, setIsLogin: setIsLoginAndStore, role, setRole: setRoleAndStore, isLoading }}
// 		>
// 			{children}
// 		</UserContext.Provider>
// 	);
// };

// export const useUser = () => {
// 	const context = useContext(UserContext);
// 	if (context === undefined) {
// 		throw new Error('useUser must be used within a UserProvider');
// 	}
// 	return context;
// };
interface CustomJwtPayload extends JwtPayload {
	role: string;
}
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

	// Kiểm tra token khi tải lại trang
	useEffect(() => {
		const initializeAuth = async () => {
			const token = Cookies.get('access_token');
			if (token) {
				try {
					setIsLoading(true);
					const response = await axios.get<User>('/api/users/me');
					setUser(response.data);
					setIsLogin(true);
					setRole(response.data.role);
				} catch (error) {
					console.error('Error fetching user data:', error);
					Cookies.remove('access_token');
					Cookies.remove('refresh_token');
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
			console.log(response.data);
			const { access_token, refreshToken, user: userData } = response.data;
			const decodedToken = jwtDecode<CustomJwtPayload>(refreshToken);
			Cookies.set('access_token', access_token);
			Cookies.set('refresh_token', refreshToken);

			setUser(userData);
			setIsLogin(true);
			setRole(decodedToken.role);
			// router.push(`/${locale}`);
		} catch (error) {
			console.error('Login failed:', error);
			throw error; // Rethrow để xử lý ở component
		} finally {
			setIsLoading(false);
		}
	};
	console.log(isLogin);

	const logout = () => {
		Cookies.remove('access_token');
		Cookies.remove('refresh_token');
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
export const useUser = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

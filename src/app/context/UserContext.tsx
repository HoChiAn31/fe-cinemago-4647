'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
	role: string;
	setRole: (value: string) => void;
	isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLogin, setIsLogin] = useState(false);
	const [role, setRole] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkLoginStatus = () => {
			if (typeof window !== 'undefined') {
				const storedIsLogin = localStorage.getItem('isLogin') === 'true';
				const storedRole = localStorage.getItem('userRole') || '';
				setIsLogin(storedIsLogin);
				setRole(storedRole);
				setIsLoading(false);
			}
		};

		checkLoginStatus();
	}, []);

	const setIsLoginAndStore = (value: boolean) => {
		setIsLogin(value);
		localStorage.setItem('isLogin', value.toString());
	};

	const setRoleAndStore = (newRole: string) => {
		setRole(newRole);
		localStorage.setItem('userRole', newRole);
	};

	return (
		<UserContext.Provider
			value={{ isLogin, setIsLogin: setIsLoginAndStore, role, setRole: setRoleAndStore, isLoading }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

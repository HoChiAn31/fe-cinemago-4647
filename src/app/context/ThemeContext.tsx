'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface ThemeContextType {
	url?: string;
	isDarkMode?: boolean;
	setIsDarkMode?: (value: boolean) => void;
	toggleDarkMode: () => void;
	isCollapsedAdmin?: boolean;
	setIsCollapsedAdmin?: (value: boolean) => void;
	toggleCollapsedAdmin: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [url, setUrl] = useState<string>('http://localhost:8080');
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		// Read initial value from localStorage
		const savedMode = localStorage.getItem('darkMode');
		return savedMode === 'true';
	});
	const [isCollapsedAdmin, setIsCollapsedAdmin] = useState<boolean>(false);

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => {
			const newMode = !prev;
			localStorage.setItem('darkMode', JSON.stringify(newMode));
			document.documentElement.classList.toggle('dark', newMode);
			return newMode;
		});
	};

	const toggleCollapsedAdmin = () => {
		setIsCollapsedAdmin((prev) => {
			const newMode = !prev;
			localStorage.setItem('isCollapsedAdmin', JSON.stringify(newMode));
			return newMode;
		});
	};
	useEffect(() => {
		const localIsCollapsedAdmin = localStorage.getItem('isCollapsedAdmin');
		setIsCollapsedAdmin(localIsCollapsedAdmin === 'true');

		toggleDarkMode();
	}, []);
	return (
		<ThemeContext.Provider
			value={{
				url,
				isDarkMode,
				toggleDarkMode,
				isCollapsedAdmin,
				setIsCollapsedAdmin,
				toggleCollapsedAdmin,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme: () => ThemeContextType = () => {
	// Specify the return type
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

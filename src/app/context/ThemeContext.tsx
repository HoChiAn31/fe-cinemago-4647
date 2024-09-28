'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface ThemeContextType {
	url?: string;
	darkMode?: boolean;
	toggleDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [url, setUrl] = useState<string>('http://localhost:8080');
	const [darkMode, setDarkMode] = useState(() => {
		// Read initial value from localStorage
		const savedMode = localStorage.getItem('darkMode');
		return savedMode === 'true';
	});
	const toggleDarkMode = () => {
		setDarkMode((prev) => {
			const newMode = !prev;
			localStorage.setItem('darkMode', JSON.stringify(newMode)); // Convert boolean to string
			document.documentElement.classList.toggle('dark', newMode);
			return newMode;
		});
	};
	return (
		<ThemeContext.Provider value={{ url, darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

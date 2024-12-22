'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
	url: string;
	isDarkMode: boolean;
	toggleDarkMode: () => void;
	isCollapsedAdmin: boolean;
	toggleCollapsedAdmin: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [url] = useState<string>(process.env.NEXT_PUBLIC_API || 'http://localhost:5000');
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isCollapsedAdmin, setIsCollapsedAdmin] = useState<boolean>(false);

	// Đồng bộ trạng thái dark mode từ localStorage
	useEffect(() => {
		const savedMode = localStorage.getItem('darkMode') === 'true';
		setIsDarkMode(savedMode);
		document.documentElement.classList.toggle('dark', savedMode);
	}, []);

	// Đồng bộ trạng thái collapsed admin từ localStorage
	useEffect(() => {
		const savedCollapsed = localStorage.getItem('isCollapsedAdmin') === 'true';
		setIsCollapsedAdmin(savedCollapsed);
	}, []);

	// Toggle dark mode
	const toggleDarkMode = () => {
		setIsDarkMode((prev) => {
			const newMode = !prev;
			localStorage.setItem('darkMode', newMode.toString());
			document.documentElement.classList.toggle('dark', newMode);
			return newMode;
		});
	};

	// Toggle collapsed admin
	const toggleCollapsedAdmin = () => {
		setIsCollapsedAdmin((prev) => {
			const newMode = !prev;
			localStorage.setItem('isCollapsedAdmin', newMode.toString());
			return newMode;
		});
	};

	return (
		<ThemeContext.Provider
			value={{
				url,
				isDarkMode,
				toggleDarkMode,
				isCollapsedAdmin,
				toggleCollapsedAdmin,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

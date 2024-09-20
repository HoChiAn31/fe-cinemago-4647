'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface ThemeContextType {
	url?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [url, setUrl] = useState<string>('http://localhost:8080');

	return <ThemeContext.Provider value={{ url }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

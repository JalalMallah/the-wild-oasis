import { createContext } from 'react';

type ThemeContextValue = {
	isDarkMode: boolean;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

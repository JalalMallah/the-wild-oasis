import { type ReactNode, useEffect } from 'react';

import { useLocalStorageState } from '@hooks/useLocalStorageState';
import { ThemeContext } from './ThemeContext';

type Props = {
	children: ReactNode;
};

const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

function ThemeProvider({ children }: Props) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		defaultTheme,
		'isDarkMode',
	);

	const toggleTheme = () => setIsDarkMode(prev => !prev);

	const contextValue = {
		isDarkMode,
		toggleTheme,
	};

	useEffect(() => {
		document.documentElement.classList.toggle('dark-mode');
	}, [isDarkMode]);

	return (
		<ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
	);
}

export default ThemeProvider;

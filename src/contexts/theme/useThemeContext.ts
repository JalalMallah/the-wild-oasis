import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';

export function useThemeContext() {
	const value = useContext(ThemeContext);

	if (!value) throw new Error('useThemeContext must be used inside ThemeProvider');

	return value;
}

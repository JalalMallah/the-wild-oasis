import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import { useThemeContext } from '@contexts/theme/useThemeContext';
import ButtonIcon from './ButtonIcon';

function ThemeToggle() {
	const { isDarkMode, toggleTheme } = useThemeContext();

	return (
		<ButtonIcon onClick={toggleTheme}>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</ButtonIcon>
	);
}

export default ThemeToggle;

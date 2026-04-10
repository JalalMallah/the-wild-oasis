import styled from 'styled-components';

import { useThemeContext } from '@contexts/theme/useThemeContext';

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo() {
	const { isDarkMode } = useThemeContext();

	const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

	return (
		<StyledLogo>
			<Img src={src} alt='Logo' />
		</StyledLogo>
	);
}

export default Logo;

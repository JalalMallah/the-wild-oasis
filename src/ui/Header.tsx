import styled from 'styled-components';

import UserInfo from '@features/authentication/UserInfo';
import HeaderMenu from './HeaderMenu';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--color-grey-100);
	padding: 1.2rem 4.8rem;
	background-color: var(--color-grey-0);
`;

function Header() {
	return (
		<StyledHeader>
			<UserInfo />
			<HeaderMenu />
		</StyledHeader>
	);
}

export default Header;

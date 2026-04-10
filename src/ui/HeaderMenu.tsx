import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import LogoutButton from '@features/authentication/LogoutButton';
import ButtonIcon from './ButtonIcon';
import ThemeToggle from './ThemeToggle';

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate(ROUTES.ACCOUNT)}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>

			<li>
				<ThemeToggle />
			</li>

			<li>
				<LogoutButton />
			</li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;

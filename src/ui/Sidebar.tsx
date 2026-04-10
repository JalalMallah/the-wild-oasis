import styled from 'styled-components';

// import Uploader from '@data/Uploader';
import Logo from './Logo';
import Nav from './Nav';

const StyledSidebar = styled.aside`
	grid-row: 1 / -1;

	display: flex;
	flex-direction: column;
	gap: 3.2rem;

	border-right: 1px solid var(--color-grey-100);
	padding: 3.2rem 2.4rem;
	background-color: var(--color-grey-0);
`;

function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<Nav />
			{/* <Uploader /> */}
		</StyledSidebar>
	);
}

export default Sidebar;

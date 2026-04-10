import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';

const Container = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
	overflow-y: auto;
	scrollbar-gutter: stable;
`;

const OutletContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	max-width: 120rem;
	margin: 0 auto;
`;

function Layout() {
	return (
		<Container>
			<Header />
			<Sidebar />
			<Main>
				<OutletContainer>
					<Outlet />
				</OutletContainer>
			</Main>
		</Container>
	);
}

export default Layout;

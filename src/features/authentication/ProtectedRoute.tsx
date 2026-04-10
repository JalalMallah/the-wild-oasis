import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import Spinner from '@ui/Spinner';
import { useUser } from './useUser';

const SpinnerWrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-grey-50);
`;

type Props = {
	children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
	const navigate = useNavigate();

	// 1. Load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. If there is NO authenticated user, redirect to the login page
	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate(ROUTES.LOGIN);
	}, [isAuthenticated, isLoading, navigate]);

	// 3. While loading, show a spinner
	if (isLoading)
		return (
			<SpinnerWrapper>
				<Spinner />
			</SpinnerWrapper>
		);

	// 4. If there IS a user, render the app
	return <>{isAuthenticated ? children : null}</>;
}

export default ProtectedRoute;

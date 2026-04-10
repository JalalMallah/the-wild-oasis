import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { logOut as logOutApi } from '@services/auth';

export function useLogOut() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isPending: isPendingLogout, mutate: logOut } = useMutation({
		mutationFn: logOutApi,
		onSuccess: () => {
			toast.success('Logged out successfully!');
			queryClient.removeQueries();
			navigate(ROUTES.LOGIN, { replace: true });
		},
		onError: () => toast.error('Failed to log out.'),
	});

	return { isPendingLogout, logOut };
}

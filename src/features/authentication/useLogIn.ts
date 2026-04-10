import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { logIn as logInApi } from '@services/auth';

export function useLogIn() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isPending: isPendingLogin, mutate: logIn } = useMutation({
		mutationFn: logInApi,
		onSuccess: data => {
			toast.success('Logged in successfully!');
			queryClient.setQueryData(['user'], data?.user);
			navigate(ROUTES.DASHBOARD, { replace: true });
		},
		onError: () => toast.error('Failed to log in.'),
	});

	return { isPendingLogin, logIn };
}

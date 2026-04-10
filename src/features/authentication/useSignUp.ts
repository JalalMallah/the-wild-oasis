import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signUp as signUpApi } from '@services/auth';

export function useSignUp() {
	const { isPending: isPendingSignup, mutate: signUp } = useMutation({
		mutationFn: signUpApi,
		onSuccess: () =>
			toast.success(
				"Account created successfully! Please verify the new account from user's email address.",
			),
		onError: () => toast.error('Failed to sign up.'),
	});

	return { isPendingSignup, signUp };
}

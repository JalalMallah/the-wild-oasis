import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCurrentUser } from '@services/auth';

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { isPending: isPendingUpdate, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: () => {
			toast.success('User updated successfully!');
			queryClient.invalidateQueries({
				queryKey: ['user'],
			});
		},
		onError: (err: Error) => toast.error(err.message),
	});

	return { isPendingUpdate, updateUser };
}

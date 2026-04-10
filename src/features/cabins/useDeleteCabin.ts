import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteCabin as deleteCabinApi } from '@services/cabins';

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isPending: isPendingDelete, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success('Cabin deleted successfully!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (err: Error) => toast.error(err.message),
	});

	return { isPendingDelete, deleteCabin };
}

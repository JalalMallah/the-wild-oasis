import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
	updateCabin as updateCabinApi,
	type UpdateCabinInput,
} from '@services/cabins';

export function useUpdateCabin() {
	const queryClient = useQueryClient();

	const { isPending: isPendingUpdate, mutate: updateCabin } = useMutation({
		mutationFn: ({ id, cabinData }: UpdateCabinInput) =>
			updateCabinApi(id, cabinData),
		onSuccess: () => {
			toast.success('Cabin updated successfully!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (err: Error) => toast.error(err.message),
	});

	return { isPendingUpdate, updateCabin };
}

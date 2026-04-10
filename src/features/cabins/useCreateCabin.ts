import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
	createCabin as createCabinApi,
	type CreateCabinInput,
} from '@services/cabins';

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { isPending: isPendingCreate, mutate: createCabin } = useMutation({
		mutationFn: ({ cabinData, isDuplicate }: CreateCabinInput) =>
			createCabinApi(cabinData, isDuplicate),
		onSuccess: () => {
			toast.success('Cabin created successfully!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (err: Error) => toast.error(err.message),
	});

	return { isPendingCreate, createCabin };
}

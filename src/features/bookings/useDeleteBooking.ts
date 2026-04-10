import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '@services/bookings';

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isPending: isPendingDelete, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			toast.success('Booking deleted successfully!');
			queryClient.invalidateQueries({ type: 'active' });
		},
		onError: () => toast.error('Failed to delete booking.'),
	});

	return { isPendingDelete, deleteBooking };
}

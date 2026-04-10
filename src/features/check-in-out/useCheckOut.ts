import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateBooking } from '@services/bookings';

export function useCheckOut() {
	const queryClient = useQueryClient();

	const { isPending: isPendingCheckOut, mutate: checkOut } = useMutation({
		mutationFn: (bookingId: number) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		onSuccess: () => {
			toast.success('Booking checked out successfully!');
			queryClient.invalidateQueries({ type: 'active' });
		},
		onError: () => toast.error('Failed to check out booking.'),
	});

	return { isPendingCheckOut, checkOut };
}

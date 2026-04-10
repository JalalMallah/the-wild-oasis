import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { updateBooking } from '@services/bookings';

type MutationArgs = {
	bookingId: number;
	breakfast?: {
		hasBreakfast: boolean;
		extrasPrice: number;
		totalPrice: number;
	};
};

export function useCheckIn() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isPending: isPendingCheckIn, mutate: checkIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }: MutationArgs) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),
		onSuccess: () => {
			toast.success('Booking checked in successfully!');
			queryClient.invalidateQueries({ type: 'active' });
			navigate(ROUTES.DASHBOARD);
		},
		onError: () => toast.error('Failed to check in booking.'),
	});

	return { isPendingCheckIn, checkIn };
}

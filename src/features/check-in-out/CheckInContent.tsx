/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useId, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '@features/bookings/BookingDataBox';
import type { NonNullableBookingWithRelations } from '@features/bookings/types';
import { useBooking } from '@features/bookings/useBooking';
import { useSettings } from '@features/settings/useSettings';
import { useGoBack } from '@hooks/useGoBack';
import Button from '@ui/Button';
import ButtonGroup from '@ui/ButtonGroup';
import ButtonText from '@ui/ButtonText';
import Checkbox from '@ui/Checkbox';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import Spinner from '@ui/Spinner';
import { formatCurrency } from '@utils/helpers';
import { useCheckIn } from './useCheckIn';

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckInContent() {
	const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
	const [shouldAddBreakfast, setShouldAddBreakfast] = useState(false);

	const paymentId = useId();
	const breakfastId = useId();

	const { booking, isLoading: isLoadingBooking } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();
	const { isPendingCheckIn, checkIn } = useCheckIn();

	const isLoading = isLoadingBooking || isLoadingSettings;

	const goBack = useGoBack();

	const optionalBreakfastPrice =
		(settings?.breakfastPrice ?? 0) *
		(booking?.numNights ?? 0) *
		(booking?.numGuests ?? 0);

	const totalAmount = shouldAddBreakfast
		? `${formatCurrency((booking?.totalPrice ?? 0) + optionalBreakfastPrice)} (${formatCurrency(booking?.totalPrice ?? 0)} + ${formatCurrency(optionalBreakfastPrice)})`
		: formatCurrency(booking?.totalPrice ?? 0);

	const handleBreakfastChange = () => {
		setShouldAddBreakfast(prev => !prev);
		setIsPaymentConfirmed(false);
	};

	const handlePaymentChange = () => setIsPaymentConfirmed(prev => !prev);

	const handleCheckIn = () => {
		if (!isPaymentConfirmed || !booking?.id) return;

		if (shouldAddBreakfast) {
			checkIn({
				bookingId: booking?.id,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: (booking?.totalPrice ?? 0) + optionalBreakfastPrice,
				},
			});
		} else checkIn({ bookingId: booking?.id });
	};

	useEffect(() => {
		setIsPaymentConfirmed(booking?.isPaid ?? false);
		setShouldAddBreakfast(booking?.hasBreakfast ?? false);
	}, [booking?.isPaid, booking?.hasBreakfast]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row>
				<Heading>Check in booking #{booking?.id}</Heading>
				<ButtonText onClick={goBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking as NonNullableBookingWithRelations} />

			{!booking?.hasBreakfast && (
				<Box>
					<Checkbox
						id={breakfastId}
						isChecked={shouldAddBreakfast}
						onChange={handleBreakfastChange}
					>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					id={paymentId}
					isChecked={isPaymentConfirmed}
					isDisabled={isPaymentConfirmed}
					onChange={handlePaymentChange}
				>
					I confirm that {booking?.guests?.fullName} has paid the total amount of{' '}
					{totalAmount}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckIn}
					disabled={!isPaymentConfirmed || isPendingCheckIn}
				>
					Check in booking #{booking?.id}
				</Button>
				<Button $variant='secondary' onClick={goBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckInContent;

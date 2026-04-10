import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import { useCheckOut } from '@features/check-in-out/useCheckOut';
import { useGoBack } from '@hooks/useGoBack';
import Button from '@ui/Button';
import ButtonGroup from '@ui/ButtonGroup';
import ButtonText from '@ui/ButtonText';
import DeleteConfirmation from '@ui/DeleteConfirmation';
import Empty from '@ui/Empty';
import Heading from '@ui/Heading';
import Modal from '@ui/Modal';
import Row from '@ui/Row';
import Spinner from '@ui/Spinner';
import Tag from '@ui/Tag';
import BookingDataBox from './BookingDataBox';
import type { NonNullableBookingWithRelations, Status, TagColor } from './types';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetailsContent() {
	const navigate = useNavigate();

	const { isLoading, booking } = useBooking();
	const { isPendingCheckOut, checkOut } = useCheckOut();
	const { isPendingDelete, deleteBooking } = useDeleteBooking();

	const goBack = useGoBack();

	const statusToTagName: Record<Status, TagColor> = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	const safeStatus: Status = (booking?.status ?? 'unconfirmed') as Status;

	const isStatusUnconfirmed = safeStatus === 'unconfirmed';
	const isStatusCheckedIn = safeStatus === 'checked-in';

	const handleDelete = () => {
		if (!booking?.id) return;

		deleteBooking(booking?.id, {
			onSettled: goBack,
		});
	};

	if (!booking) return <Empty resource='booking' />;

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row>
				<HeadingGroup>
					<Heading>Booking #{booking?.id}</Heading>
					<Tag $type={statusToTagName[safeStatus]}>
						{safeStatus.replace('-', ' ')}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={goBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking as NonNullableBookingWithRelations} />

			<ButtonGroup>
				{isStatusUnconfirmed && (
					<Button
						onClick={() => booking?.id && navigate(ROUTES.CHECK_IN(booking?.id))}
					>
						Check In
					</Button>
				)}

				{isStatusCheckedIn && (
					<Button
						onClick={() => booking?.id && checkOut(booking?.id)}
						disabled={isPendingCheckOut}
					>
						Check Out
					</Button>
				)}

				<Modal>
					<Modal.Trigger windowToOpen='delete-booking'>
						<Button $variant='danger'>Delete</Button>
					</Modal.Trigger>

					<Modal.Window name='delete-booking'>
						<DeleteConfirmation
							resourceName='booking'
							onConfirm={handleDelete}
							isDisabled={isPendingDelete}
						/>
					</Modal.Window>
				</Modal>

				<Button $variant='secondary' onClick={goBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetailsContent;

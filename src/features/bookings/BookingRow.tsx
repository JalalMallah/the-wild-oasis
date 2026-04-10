import { format, isToday } from 'date-fns';
import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import { useCheckOut } from '@features/check-in-out/useCheckOut';
import ContextMenu from '@ui/ContextMenu';
import DeleteConfirmation from '@ui/DeleteConfirmation';
import Modal from '@ui/Modal';
import Table from '@ui/Table';
import Tag from '@ui/Tag';
import { formatCurrency, formatDistanceFromNow } from '@utils/helpers';
import type { BookingWithRelations, Status, TagColor } from './types';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

type Props = {
	booking: BookingWithRelations;
};

function BookingRow({
	booking: {
		id: bookingId,
		startDate,
		endDate,
		numNights,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}: Props) {
	const navigate = useNavigate();

	const { isPendingCheckOut, checkOut } = useCheckOut();
	const { isPendingDelete, deleteBooking } = useDeleteBooking();

	const statusToTagName: Record<Status, TagColor> = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	const safeStatus: Status = (status ?? 'unconfirmed') as Status;

	const isStatusUnconfirmed = safeStatus === 'unconfirmed';
	const isStatusCheckedIn = safeStatus === 'checked-in';

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate ?? ''))
						? 'Today'
						: formatDistanceFromNow(startDate ?? '')}{' '}
					&rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate ?? ''), 'MMM dd yyyy')} &mdash;{' '}
					{format(new Date(endDate ?? ''), 'MMM dd yyyy')}
				</span>
			</Stacked>

			<Tag $type={statusToTagName[safeStatus]}>{safeStatus.replace('-', ' ')}</Tag>

			<Amount>{formatCurrency(totalPrice ?? 0)}</Amount>

			<Modal>
				<ContextMenu.Menu>
					<ContextMenu.Toggle id={bookingId} />
					<ContextMenu.List id={bookingId}>
						<ContextMenu.Button
							icon={<HiEye />}
							onClick={() => navigate(ROUTES.BOOKING_DETAILS(bookingId))}
						>
							See Details
						</ContextMenu.Button>

						{isStatusUnconfirmed && (
							<ContextMenu.Button
								icon={<HiArrowDownOnSquare />}
								onClick={() => navigate(ROUTES.CHECK_IN(bookingId))}
							>
								Check In
							</ContextMenu.Button>
						)}

						{isStatusCheckedIn && (
							<ContextMenu.Button
								icon={<HiArrowUpOnSquare />}
								onClick={() => checkOut(bookingId)}
								isDisabled={isPendingCheckOut}
							>
								Check Out
							</ContextMenu.Button>
						)}

						<Modal.Trigger windowToOpen='delete-booking'>
							<ContextMenu.Button icon={<HiTrash />}>Delete</ContextMenu.Button>
						</Modal.Trigger>
					</ContextMenu.List>
				</ContextMenu.Menu>

				<Modal.Window name='delete-booking'>
					<DeleteConfirmation
						resourceName='booking'
						onConfirm={() => deleteBooking(bookingId)}
						isDisabled={isPendingDelete}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;

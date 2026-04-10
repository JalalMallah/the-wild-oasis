import { BOOKING_STATUS } from '@constants/bookingStatus';
import Filter from '@ui/Filter';
import Sort from '@ui/Sort';
import TableOperations from '@ui/TableOperations';

const statusOptions = [
	{ value: BOOKING_STATUS.ALL, label: 'All' },
	{ value: BOOKING_STATUS.CHECKED_OUT, label: 'Checked out' },
	{ value: BOOKING_STATUS.CHECKED_IN, label: 'Checked in' },
	{ value: BOOKING_STATUS.UNCONFIRMED, label: 'Unconfirmed' },
] as const;

const bookingSortOptions = [
	{ value: 'startDate-desc', label: 'Sort by date (recent first)' },
	{ value: 'startDate-asc', label: 'Sort by date (earlier first)' },
	{
		value: 'totalPrice-desc',
		label: 'Sort by amount (high first)',
	},
	{ value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
] as const;

function BookingControls() {
	return (
		<TableOperations>
			<Filter param='status' options={statusOptions} />

			<Sort options={bookingSortOptions} />
		</TableOperations>
	);
}

export default BookingControls;

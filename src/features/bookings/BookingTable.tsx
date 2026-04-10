import ContextMenu from '@ui/ContextMenu';
import Empty from '@ui/Empty';
import Pagination from '@ui/Pagination';
import Spinner from '@ui/Spinner';
import Table from '@ui/Table';
import BookingRow from './BookingRow';
import type { BookingWithRelations } from './types';
import { useBookings } from './useBookings';

function BookingTable() {
	const { bookings, isLoading, count } = useBookings();

	if (isLoading) return <Spinner />;

	if (!bookings?.length || !count) return <Empty resource='bookings' />;

	return (
		<ContextMenu>
			<Table $columns='0.6fr 1.5fr 2.2fr 1.5fr 1fr 8rem'>
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div>Actions</div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={booking => (
						<BookingRow key={booking.id} booking={booking as BookingWithRelations} />
					)}
				/>

				<Table.Footer>
					<Pagination total={count} />
				</Table.Footer>
			</Table>
		</ContextMenu>
	);
}

export default BookingTable;

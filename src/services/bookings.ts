import { BOOKING_STATUS } from '@constants/bookingStatus';
import { type TablesUpdate } from '@models/supabase';
import { getToday } from '@utils/helpers';
import { supabase } from './supabase';

const pageSize = Number(import.meta.env.VITE_BOOKINGS_PAGE_SIZE);

type GetBookingsArgs = {
	filterData?: {
		field: string;
		value: string;
	};
	sortData?: {
		field: string;
		direction: string;
	};
	page?: number;
};

export async function getBookings({ filterData, sortData, page }: GetBookingsArgs) {
	let query = supabase
		.from('bookings')
		.select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

	// FILTER
	if (filterData && filterData?.value !== BOOKING_STATUS.ALL) {
		query = query.eq(filterData.field, filterData.value);
	}

	// SORT
	if (sortData) {
		query = query.order(sortData.field, {
			ascending: sortData.direction === 'asc',
		});
	}

	// PAGINATION
	if (page) {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;

		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error('Failed to load bookings.');
	}

	return { data, count };
}

export async function getBookingById(id: number) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, cabins(*), guests(*)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Failed to load booking.');
	}

	return data;
}

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
	const { data, error } = await supabase
		.from('bookings')
		.select('createdAt, totalPrice, extrasPrice')
		.gte('createdAt', date)
		.lte('createdAt', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Failed to load bookings.');
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
	const { data, error } = await supabase
		.from('bookings')
		// .select('*')
		.select('*, guests(fullName)')
		.gte('startDate', date)
		.lte('startDate', getToday());

	if (error) {
		console.error(error);
		throw new Error('Failed to load bookings.');
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName, nationality, countryFlag)')
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
		)
		.order('createdAt');

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error('Failed to load bookings.');
	}
	return data;
}

type BookingUpdate = TablesUpdate<'bookings'>;

export async function updateBooking(id: number, obj: BookingUpdate) {
	const { data, error } = await supabase
		.from('bookings')
		.update(obj)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Failed to update booking.');
	}
	return data;
}

export async function deleteBooking(id: number) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Failed to delete booking.');
	}
	return data;
}

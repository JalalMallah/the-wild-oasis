import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { type BookingStatus, BOOKING_STATUS } from '@constants/bookingStatus';
import { getBookings } from '@services/bookings';

const pageSize = Number(import.meta.env.VITE_BOOKINGS_PAGE_SIZE);

export function useBookings() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// FILTER
	const activeStatus =
		(searchParams.get('status') as BookingStatus) ?? BOOKING_STATUS.ALL;

	const filterData = {
		field: 'status',
		value: activeStatus,
	};

	// SORT
	const activeSortValue = searchParams.get('sortBy') ?? 'startDate-desc';
	const [field, direction] = activeSortValue.split('-');

	const sortData = { field, direction };

	// PAGINATION
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

	// QUERY
	const { isLoading, data, error } = useQuery({
		queryKey: ['bookings', filterData, sortData, page],
		queryFn: () => getBookings({ filterData, sortData, page }),
	});

	const { data: bookings, count } = data ?? { data: [], count: null };

	// PRE-FETCHING
	const pageCount = Math.ceil((count ?? 0) / pageSize);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filterData, sortData, page + 1],
			queryFn: () => getBookings({ filterData, sortData, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filterData, sortData, page - 1],
			queryFn: () => getBookings({ filterData, sortData, page: page - 1 }),
		});
	}

	return { isLoading, bookings, error, count };
}

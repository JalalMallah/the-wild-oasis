import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '@services/bookings';

export function useTodayActivity() {
	const {
		isLoading,
		data: activities,
		error,
	} = useQuery({
		queryKey: ['today-activity'],
		queryFn: getStaysTodayActivity,
	});

	return { isLoading, activities, error };
}

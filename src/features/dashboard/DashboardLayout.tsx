import styled from 'styled-components';

import { useCabins } from '@features/cabins/useCabins';
import TodayActivity from '@features/check-in-out/TodayActivity';
import Spinner from '@ui/Spinner';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingBookings, bookings = [] } = useRecentBookings();
	const {
		isLoading: isLoadingStays,
		confirmedStays = [],
		numDays,
	} = useRecentStays();
	const { isLoading: isLoadingCabins, cabins } = useCabins();

	const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins;

	if (isLoading) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins?.length ?? 0}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;

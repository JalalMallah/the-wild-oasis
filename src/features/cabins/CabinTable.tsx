import { useSearchParams } from 'react-router-dom';

import type { Tables } from '@models/supabase';
import ContextMenu from '@ui/ContextMenu';
import Empty from '@ui/Empty';
import Spinner from '@ui/Spinner';
import Table from '@ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

type Cabin = Tables<'cabins'>;

type SortField = 'name' | 'regularPrice' | 'maxCapacity';
type SortDirection = 'asc' | 'desc';

function CabinTable() {
	const [searchParams] = useSearchParams();

	const { isLoading, cabins } = useCabins();

	if (isLoading) return <Spinner />;
	if (!cabins?.length) return <Empty resource='cabins' />;

	// FILTERING
	const filterValue = searchParams.get('discount') ?? 'all';

	let filteredCabins;

	if (filterValue === 'all') filteredCabins = cabins;

	if (filterValue === 'no-discount')
		filteredCabins = cabins?.filter(cabin => !cabin.discount);

	if (filterValue === 'with-discount')
		filteredCabins = cabins?.filter(cabin => !!cabin.discount);

	// SORTING
	const sortValue = searchParams.get('sortBy') ?? 'name-asc';
	const [field, direction] = sortValue.split('-') as [SortField, SortDirection];
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedCabins = [...(filteredCabins ?? [])].sort((a, b) => {
		const aValue = a[field];
		const bValue = b[field];

		// Handle nulls first
		if (aValue == null) return 1;
		if (bValue == null) return -1;

		// Numbers
		if (typeof aValue === 'number' && typeof bValue === 'number') {
			return (aValue - bValue) * modifier;
		}

		// Strings
		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return aValue.localeCompare(bValue) * modifier;
		}

		return 0;
	});

	return (
		<ContextMenu>
			<Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div>Image</div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div>Actions</div>
				</Table.Header>

				<Table.Body
					data={sortedCabins ?? []}
					render={cabin => <CabinRow key={cabin.id} cabin={cabin as Cabin} />}
				/>
			</Table>
		</ContextMenu>
	);
}

export default CabinTable;

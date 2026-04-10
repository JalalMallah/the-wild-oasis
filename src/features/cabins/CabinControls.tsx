import Filter from '@ui/Filter';
import Sort from '@ui/Sort';
import TableOperations from '@ui/TableOperations';

const discountOptions = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'No Discount',
		value: 'no-discount',
	},
	{
		label: 'With Discount',
		value: 'with-discount',
	},
] as const;

const cabinSortOptions = [
	{
		value: 'name-asc',
		label: 'Sort by name (A-Z)',
	},
	{
		value: 'name-desc',
		label: 'Sort by name (Z-A)',
	},
	{
		value: 'regularPrice-asc',
		label: 'Sort by price (low first)',
	},
	{
		value: 'regularPrice-desc',
		label: 'Sort by price (high first)',
	},
	{
		value: 'maxCapacity-asc',
		label: 'Sort by capacity (low first)',
	},
	{
		value: 'maxCapacity-desc',
		label: 'Sort by capacity (high first)',
	},
] as const;

function CabinControls() {
	return (
		<TableOperations>
			<Filter param='discount' options={discountOptions} />
			<Sort options={cabinSortOptions} />
		</TableOperations>
	);
}

export default CabinControls;

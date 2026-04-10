import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import Select from './Select';

type SortOption<T extends string> = {
	label: string;
	value: T;
};

type SortProps<T extends string> = {
	options: readonly SortOption<T>[];
};

function Sort<T extends string>({ options }: SortProps<T>) {
	const [searchParams, setSearchParams] = useSearchParams();

	const activeValue = searchParams.get('sortBy') ?? options.at(0)?.value ?? '';

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	};

	return <Select options={options} value={activeValue} onChange={handleChange} />;
}

export default Sort;

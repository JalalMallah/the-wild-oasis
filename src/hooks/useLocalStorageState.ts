import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

type ReturnValue = [boolean, Dispatch<SetStateAction<boolean>>];

export function useLocalStorageState(
	initialState: boolean,
	key: string,
): ReturnValue {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);

		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}

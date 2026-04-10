import { useEffect, type RefObject } from 'react';

export function useOutsideClick(
	ref: RefObject<HTMLElement | null>,
	handler: () => void,
	listenCapturing: boolean = true,
) {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!ref.current || ref.current.contains(e.target as Node)) return;

			handler();
		};

		document.addEventListener('mousedown', handleClick, listenCapturing);

		return () =>
			document.removeEventListener('mousedown', handleClick, listenCapturing);
	}, [ref, handler, listenCapturing]);
}

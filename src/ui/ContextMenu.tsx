import {
	createContext,
	useContext,
	useRef,
	useState,
	type Dispatch,
	type MouseEvent as ReactMouseEvent,
	type ReactNode,
	type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '@hooks/useOutsideClick';

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: relative;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;
type Position = {
	x: number;
	y: number;
};

type StyledListProps = {
	position: Position;
};

const StyledList = styled.ul<StyledListProps>`
	position: absolute;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${props => props.position.x}px;
	top: ${props => props.position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

type ContextValue = {
	activeId: number | null;
	open: Dispatch<SetStateAction<number | null>>;
	close: () => void;
	position: Position | null;
	setPosition: Dispatch<SetStateAction<Position | null>>;
};

const ContextMenuContext = createContext<ContextValue | null>(null);

function useContextMenuContext() {
	const value = useContext(ContextMenuContext);

	if (!value)
		throw new Error('useContextMenuContext must be used inside ContextMenuProvider');

	return value;
}

type Children = {
	children: ReactNode;
};

function ContextMenu({ children }: Children) {
	const [activeId, setActiveId] = useState<number | null>(null);
	const [position, setPosition] = useState<Position | null>(null);

	const open = setActiveId;
	const close = () => setActiveId(null);

	const contextValue: ContextValue = {
		activeId,
		open,
		close,
		position,
		setPosition,
	};

	return (
		<ContextMenuContext.Provider value={contextValue}>
			{children}
		</ContextMenuContext.Provider>
	);
}

type ToggleProps = {
	id: number;
};

function Toggle({ id }: ToggleProps) {
	const { activeId, open, close, setPosition } = useContextMenuContext();

	const handleClick = (e: ReactMouseEvent) => {
		e.stopPropagation();

		const target = e.target as HTMLElement;
		const rect = target.closest('button')!.getBoundingClientRect();

		const position = {
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		};

		setPosition(position);

		if (id === activeId) close();
		else open(id);
	};

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

type ListProps = ToggleProps & Children;

function List({ id, children }: ListProps) {
	const { activeId, position, close } = useContextMenuContext();
	const ref = useRef(null);

	useOutsideClick(ref, close, false);

	if (activeId !== id) return null;

	const fallbackPosition = {
		x: 20,
		y: 20,
	};

	return createPortal(
		<StyledList ref={ref} position={position ?? fallbackPosition}>
			{children}
		</StyledList>,
		document.body,
	);
}

type ButtonProps = Children & {
	icon: ReactNode;
	isDisabled?: boolean;
	onClick?: () => void;
};

function Button({ children, icon, isDisabled, onClick }: ButtonProps) {
	const { close } = useContextMenuContext();

	const handleClick = () => {
		onClick?.();
		close();
	};

	return (
		<li>
			<StyledButton onClick={handleClick} disabled={isDisabled}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

ContextMenu.Menu = Menu; // the container
ContextMenu.Toggle = Toggle; // the trigger
ContextMenu.List = List; // the list
ContextMenu.Button = Button; // the list item

export default ContextMenu;

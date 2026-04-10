import {
	cloneElement,
	createContext,
	useContext,
	useRef,
	useState,
	type Dispatch,
	type MouseEventHandler,
	type ReactElement,
	type ReactNode,
	type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

import { useOutsideClick } from '@hooks/useOutsideClick';

type Children = {
	children: ReactNode;
};

type WindowName =
	| ''
	| 'create-cabin-form'
	| 'edit-cabin-form'
	| 'delete-cabin'
	| 'delete-booking';

type ModalContextValue = {
	open: Dispatch<SetStateAction<WindowName>>;
	close: () => void;
	windowName: WindowName;
};

const ModalContext = createContext<ModalContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useModalContext() {
	const value = useContext(ModalContext);

	if (!value) throw new Error('useModalContext must be used inside ModalProvider');

	return value;
}

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 0.5rem;
	right: 1rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

function Modal({ children }: Children) {
	const [windowName, setWindowName] = useState<WindowName>('');

	const open = setWindowName;
	const close = () => setWindowName('');

	const contextValue: ModalContextValue = {
		open,
		close,
		windowName,
	};

	return (
		<ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
	);
}

type TriggerProps = {
	children: ReactElement<{ onClick?: MouseEventHandler }>;
	windowToOpen: WindowName;
};

function Trigger({ children, windowToOpen }: TriggerProps) {
	const { open } = useModalContext();

	return cloneElement(children, { onClick: () => open(windowToOpen) });
}

type WindowProps = {
	children: ReactElement<{ onCloseModal?: () => void }>;
	name: WindowName;
};

function Window({ children, name }: WindowProps) {
	const { windowName, close } = useModalContext();
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, close);

	if (name !== windowName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body,
	);
}

Modal.Trigger = Trigger;
Modal.Window = Window;

export default Modal;

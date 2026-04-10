import type { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
	display: flex;
	gap: 1.6rem;

	& input[type='checkbox'] {
		height: 2.4rem;
		width: 2.4rem;
		outline-offset: 2px;
		transform-origin: 0;
		accent-color: var(--color-brand-600);
		cursor: pointer;
	}

	& input[type='checkbox']:disabled {
		accent-color: var(--color-brand-600);
	}

	& label {
		flex: 1;

		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
`;

type Props = {
	children: ReactNode;
	id: string;
	isChecked: boolean;
	isDisabled?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({ children, id, isChecked, isDisabled = false, onChange }: Props) {
	return (
		<StyledCheckbox>
			<input
				type='checkbox'
				id={id}
				checked={isChecked}
				onChange={onChange}
				disabled={isDisabled}
			/>
			<label htmlFor={isDisabled ? '' : id}>{children}</label>
		</StyledCheckbox>
	);
}

export default Checkbox;

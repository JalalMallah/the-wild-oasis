import type { ChangeEvent } from 'react';
import styled from 'styled-components';

type StyledSelectProps = {
	$type?: 'white' | string;
};

const StyledSelect = styled.select<StyledSelectProps>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.$type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

type Option = {
	label: string;
	value: string;
};

type Props = {
	value: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	options: readonly Option[];
};

function Select({ options, value, onChange }: Props) {
	return (
		<StyledSelect value={value} onChange={onChange} $type='white'>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}

export default Select;

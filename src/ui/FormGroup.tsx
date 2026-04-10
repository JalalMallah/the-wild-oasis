import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type StyledFormGroupProps = {
	$direction?: 'horizontal' | 'vertical';
};

const StyledFormGroup = styled.div<StyledFormGroupProps>`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}

	${props =>
		props.$direction === 'vertical' &&
		css`
			display: flex;
			flex-direction: column;
			justify-content: stretch;
			align-items: flex-start;
			gap: 0.8rem;
			padding: 1.2rem 0;

			&:not(:last-child) {
				border: none;
			}
		`}
`;

const Label = styled.label`
	font-weight: 500;
`;

const ErrorMessage = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

type Props = {
	label: string;
	id: string;
	error?: string;
	children: ReactNode;
	direction?: 'horizontal' | 'vertical';
};

function FormGroup({ children, error, id, label, direction = 'horizontal' }: Props) {
	return (
		<StyledFormGroup $direction={direction}>
			<Label htmlFor={id}>{label}</Label>
			{children}
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</StyledFormGroup>
	);
}

export default FormGroup;

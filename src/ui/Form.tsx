import styled, { css } from 'styled-components';

type Props = {
	$variant?: 'modal' | 'default';
};

const variants = {
	modal: css`
		width: 80rem;
	`,
	default: css`
		padding: 2.4rem 4rem;

		/* Box */
		background-color: var(--color-grey-0);
		border: 1px solid var(--color-grey-100);
		border-radius: var(--border-radius-md);
	`,
};

const Form = styled.form<Props>`
	${props => (props.$variant === 'modal' ? variants['modal'] : variants['default'])}

	overflow: hidden;
	font-size: 1.4rem;
`;

export default Form;

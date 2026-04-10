import styled from 'styled-components';

type Props = {
	id: string;
};

const Input = styled.input.attrs({ autoComplete: 'off' })<Props>`
	width: 100%;
	border: 1px solid var(--color-grey-300);
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	padding: 8px 12px;
`;

export default Input;

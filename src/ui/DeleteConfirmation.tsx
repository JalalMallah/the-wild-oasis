import styled from 'styled-components';

import Button from './Button';
import Heading from './Heading';

const Container = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

type Props = {
	resourceName: string;
	isDisabled: boolean;
	onConfirm: () => void;
	onCloseModal?: () => void;
};

function DeleteConfirmation({
	resourceName,
	onConfirm,
	isDisabled,
	onCloseModal,
}: Props) {
	return (
		<Container>
			<Heading as='h3'>Delete {resourceName}</Heading>
			<p>
				Are you sure you want to delete this {resourceName} permanently? This action
				cannot be undone.
			</p>

			<div>
				<Button $variant='secondary' disabled={isDisabled} onClick={onCloseModal}>
					Cancel
				</Button>
				<Button $variant='danger' disabled={isDisabled} onClick={onConfirm}>
					Delete
				</Button>
			</div>
		</Container>
	);
}

export default DeleteConfirmation;

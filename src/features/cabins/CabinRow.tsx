import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import styled from 'styled-components';

import type { Tables } from '@models/supabase';
import ContextMenu from '@ui/ContextMenu';
import DeleteConfirmation from '@ui/DeleteConfirmation';
import Modal from '@ui/Modal';
import Table from '@ui/Table';
import { formatCurrency } from '@utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useCreateCabin } from './useCreateCabin';
import { useDeleteCabin } from './useDeleteCabin';

const Image = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

type Cabin = Tables<'cabins'>;

type Props = {
	cabin: Cabin;
};

function CabinRow({ cabin }: Props) {
	const { isPendingDelete, deleteCabin } = useDeleteCabin();
	const { createCabin } = useCreateCabin();

	const { description, discount, id, image, maxCapacity, name, regularPrice } =
		cabin;

	const handleDuplicate = () => {
		createCabin({
			cabinData: {
				name: `Copy of ${name}`,
				description,
				discount,
				image,
				maxCapacity,
				regularPrice,
			},
			isDuplicate: true,
		});
	};

	return (
		<Table.Row>
			<Image src={image ?? undefined} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice ?? 0)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount ?? 0)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					<ContextMenu.Menu>
						<ContextMenu.Toggle id={cabin.id} />

						<ContextMenu.List id={cabin.id}>
							<ContextMenu.Button
								icon={<HiSquare2Stack />}
								onClick={handleDuplicate}
							>
								Duplicate
							</ContextMenu.Button>
							<Modal.Trigger windowToOpen='edit-cabin-form'>
								<ContextMenu.Button icon={<HiPencil />}>Edit</ContextMenu.Button>
							</Modal.Trigger>

							<Modal.Trigger windowToOpen='delete-cabin'>
								<ContextMenu.Button icon={<HiTrash />}>Delete</ContextMenu.Button>
							</Modal.Trigger>
						</ContextMenu.List>
					</ContextMenu.Menu>

					<Modal.Window name='edit-cabin-form'>
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>

					<Modal.Window name='delete-cabin'>
						<DeleteConfirmation
							resourceName='cabin'
							onConfirm={() => deleteCabin(id)}
							isDisabled={isPendingDelete}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;

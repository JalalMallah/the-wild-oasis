import {
	useForm,
	type SubmitErrorHandler,
	type SubmitHandler,
} from 'react-hook-form';
import styled from 'styled-components';

import type { Tables, TablesInsert } from '@models/supabase';
import FormGroup from '@ui/FormGroup';
import Textarea from '@ui/Textarea';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

const ButtonsContainer = styled.div`
	display: flex;
	gap: 2rem;
	justify-content: flex-end;
	align-items: center;
	padding-top: 2.4rem;
`;

type FormValues = Omit<TablesInsert<'cabins'>, 'image'> & {
	image?: FileList | null;
};

type Cabin = Tables<'cabins'>;

type Props = {
	cabinToEdit?: Cabin | null;
	onCloseModal?: () => void;
};

function CreateCabinForm({ cabinToEdit = null, onCloseModal }: Props) {
	const isEditMode = Boolean(cabinToEdit);
	const { id: editId, ...editValues } = cabinToEdit ?? {};

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: isEditMode ? editValues : {},
	});

	const { isPendingCreate, createCabin } = useCreateCabin();
	const { isPendingUpdate, updateCabin } = useUpdateCabin();

	const onSubmit: SubmitHandler<FormValues> = formData => {
		const image =
			typeof formData.image === 'string' ? formData.image : formData.image?.[0];

		const onSuccess = () => {
			reset();
			onCloseModal?.();
		};

		if (isEditMode) {
			if (!editId) return;

			updateCabin({ id: editId, cabinData: { ...formData, image } }, { onSuccess });
		} else {
			createCabin({ cabinData: { ...formData, image } }, { onSuccess });
		}
	};

	const onError: SubmitErrorHandler<FormValues> = _errors => null;

	const isPending = isPendingCreate || isPendingUpdate;

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			$variant={onCloseModal ? 'modal' : 'default'}
		>
			<FormGroup id='name' label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isPending}
					{...register('name', { required: 'This field is required' })}
				/>
			</FormGroup>

			<FormGroup
				id='maxCapacity'
				label='Maximum capacity'
				error={errors?.maxCapacity?.message}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isPending}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormGroup>

			<FormGroup
				id='regularPrice'
				label='Regular price'
				error={errors?.regularPrice?.message}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isPending}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price cannot be equal to 0',
						},
					})}
				/>
			</FormGroup>

			<FormGroup id='discount' label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					disabled={isPending}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: value =>
							value && value < (getValues().regularPrice ?? 0)
								? true
								: 'Discount should be less than regular price',
					})}
				/>
			</FormGroup>

			<FormGroup
				id='description'
				label='Description for website'
				error={errors?.description?.message}
			>
				<Textarea
					id='description'
					defaultValue=''
					disabled={isPending}
					{...register('description', { required: 'This field is required' })}
				/>
			</FormGroup>

			<FormGroup id='image' label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditMode ? false : 'Image is required',
					})}
				/>
			</FormGroup>

			<ButtonsContainer>
				<Button $variant='secondary' type='reset' onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isPending}>Save</Button>
			</ButtonsContainer>
		</Form>
	);
}

export default CreateCabinForm;

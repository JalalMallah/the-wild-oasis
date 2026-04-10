import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	useForm,
	type SubmitErrorHandler,
	type SubmitHandler,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import type { TablesInsert } from '@models/supabase';
import FormGroup from '@ui/FormGroup';
import Textarea from '@ui/Textarea';
import { createCabin } from '../../services/cabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import Input from '../../ui/Input';

type FormValues = Omit<TablesInsert<'cabins'>, 'image'> & {
	image?: FileList | null;
};

function CreateCabinForm() {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<FormValues>();

	console.log('errors: ', errors);

	const queryClient = useQueryClient();

	const { isPending, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('Cabin created successfully!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
			reset();
		},
		onError: (err: Error) => toast.error(err.message),
	});

	const onSubmit: SubmitHandler<FormValues> = formData =>
		mutate({ ...formData, image: formData.image?.[0] });
	const onError: SubmitErrorHandler<FormValues> = _errors => null;

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
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
					{...register('image', { required: 'Image is required' })}
				/>
			</FormGroup>

			<>
				<Button $variant='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isPending}>Save</Button>
			</>
		</Form>
	);
}

export default CreateCabinForm;

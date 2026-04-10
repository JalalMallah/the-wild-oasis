import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import z from 'zod';

import Button from '@ui/Button';
import ButtonGroup from '@ui/ButtonGroup';
import Form from '@ui/Form';
import FormGroup from '@ui/FormGroup';
import Input from '@ui/Input';

import { useUpdateUser } from './useUpdateUser';

const StyledButtonGroup = styled(ButtonGroup)`
	margin-top: 2.4rem;
`;

const schema = z
	.object({
		password: z
			.string()
			.min(1, { error: 'Password is required.' })
			.min(8, { error: 'Must be at least 8 characters.' }),
		confirmPassword: z.string().min(1, { error: 'Please confirm your password.' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		error: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

type FormValues = z.infer<typeof schema>;

function UpdatePasswordForm() {
	const passwordId = useId();
	const confirmPasswordId = useId();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const { updateUser, isPendingUpdate } = useUpdateUser();

	const onSubmit: SubmitHandler<FormValues> = ({ password }) =>
		updateUser({ password }, { onSuccess: () => reset() });

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup
				id={passwordId}
				label='Password (min 8 characters)'
				error={errors.password?.message}
			>
				<Input
					type='password'
					id={passwordId}
					autoComplete='current-password'
					disabled={isPendingUpdate}
					{...register('password')}
				/>
			</FormGroup>

			<FormGroup
				id={confirmPasswordId}
				label='Confirm password'
				error={errors.confirmPassword?.message}
			>
				<Input
					type='password'
					id={confirmPasswordId}
					autoComplete='new-password'
					disabled={isPendingUpdate}
					{...register('confirmPassword')}
				/>
			</FormGroup>

			<StyledButtonGroup>
				<Button type='button' onClick={() => reset()} $variant='secondary'>
					Cancel
				</Button>
				<Button disabled={isPendingUpdate}>Update password</Button>
			</StyledButtonGroup>
		</Form>
	);
}

export default UpdatePasswordForm;

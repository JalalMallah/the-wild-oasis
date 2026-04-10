import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import z from 'zod';

import Button from '@ui/Button';
import ButtonGroup from '@ui/ButtonGroup';
import FileInput from '@ui/FileInput';
import Form from '@ui/Form';
import FormGroup from '@ui/FormGroup';
import Input from '@ui/Input';
import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';

const StyledButtonGroup = styled(ButtonGroup)`
	margin-top: 2.4rem;
`;

const schema = z.object({
	email: z.email(),
	fullName: z.string().min(1, { error: 'Full name is required.' }),
	avatar: z.preprocess(
		val => (val instanceof FileList ? val.item(0) : val),
		z.instanceof(File).nullable().optional(),
	),
});

type FormValues = z.output<typeof schema>;

function UpdateUserDataForm() {
	const emailId = useId();
	const fullNameId = useId();
	const avatarId = useId();

	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const { user } = useUser();
	const { isPendingUpdate, updateUser } = useUpdateUser();

	const { email, user_metadata } = user ?? {};
	const { fullName: currentFullName } = user_metadata ?? {};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema) as Resolver<z.output<typeof schema>>,
		defaultValues: {
			email,
			fullName: currentFullName,
		},
	});

	const onSubmit: SubmitHandler<FormValues> = ({ avatar, fullName }) =>
		updateUser({ avatar, fullName }, { onSuccess: () => reset() });

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup label='Email address' id={emailId}>
				<Input id={emailId} disabled {...register('email')} />
			</FormGroup>

			<FormGroup label='Full name' id={fullNameId} error={errors.fullName?.message}>
				<Input
					id={fullNameId}
					{...register('fullName')}
					disabled={isPendingUpdate}
				/>
			</FormGroup>

			<FormGroup label='Avatar image' id={avatarId} error={errors.avatar?.message}>
				<FileInput
					id={avatarId}
					accept='image/*'
					{...register('avatar')}
					disabled={isPendingUpdate}
				/>
			</FormGroup>

			<StyledButtonGroup>
				<Button
					type='button'
					$variant='secondary'
					onClick={() => reset()}
					disabled={isPendingUpdate}
				>
					Cancel
				</Button>
				<Button disabled={isPendingUpdate}>Update account</Button>
			</StyledButtonGroup>
		</Form>
	);
}

export default UpdateUserDataForm;

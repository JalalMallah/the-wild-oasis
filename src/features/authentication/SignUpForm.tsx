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
import SpinnerMini from '@ui/SpinnerMini';
import { useSignUp } from './useSignUp';

const StyledButtonGroup = styled(ButtonGroup)`
	margin-top: 24px;
`;

const schema = z
	.object({
		fullName: z.string().min(1, { error: 'Full name is required.' }),
		email: z.email('Invalid email address.').trim(),
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

function SignUpForm() {
	const fullNameId = useId();
	const emailId = useId();
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

	const { isPendingSignup, signUp } = useSignUp();

	const onSubmit: SubmitHandler<FormValues> = ({ fullName, email, password }) => {
		signUp({ fullName, email, password }, { onSettled: () => reset() });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup label='Full name' error={errors.fullName?.message} id={fullNameId}>
				<Input
					id={fullNameId}
					{...register('fullName')}
					disabled={isPendingSignup}
				/>
			</FormGroup>

			<FormGroup label='Email address' error={errors.email?.message} id={emailId}>
				<Input id={emailId} {...register('email')} disabled={isPendingSignup} />
			</FormGroup>

			<FormGroup
				label='Password (min 8 characters)'
				error={errors.password?.message}
				id={passwordId}
			>
				<Input
					type='password'
					id={passwordId}
					{...register('password')}
					disabled={isPendingSignup}
				/>
			</FormGroup>

			<FormGroup
				label='Confirm password'
				error={errors.confirmPassword?.message}
				id={confirmPasswordId}
			>
				<Input
					type='password'
					id={confirmPasswordId}
					{...register('confirmPassword')}
					disabled={isPendingSignup}
				/>
			</FormGroup>

			<StyledButtonGroup>
				<Button $variant='secondary' disabled={isPendingSignup}>
					Cancel
				</Button>
				<Button disabled={isPendingSignup}>
					{isPendingSignup ? <SpinnerMini /> : 'Create new user'}
				</Button>
			</StyledButtonGroup>
		</Form>
	);
}

export default SignUpForm;

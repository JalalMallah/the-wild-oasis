import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import z from 'zod';

import Button from '@ui/Button';
import Form from '@ui/Form';
import FormGroup from '@ui/FormGroup';
import Input from '@ui/Input';
import SpinnerMini from '@ui/SpinnerMini';
import { useLogIn } from './useLogIn';

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const schema = z.object({
	email: z.email('Email is required.'),
	password: z.string().min(8, 'Must be at least 8 characters.'),
});

type FormValues = z.infer<typeof schema>;

function LoginForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: import.meta.env.VITE_DEFAULT_EMAIL,
			password: import.meta.env.VITE_DEFAULT_PASSWORD,
		},
	});

	const { isPendingLogin, logIn } = useLogIn();

	const emailId = useId();
	const passwordId = useId();

	const onError = () => reset();
	const onSubmit: SubmitHandler<FormValues> = data => logIn(data, { onError });

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormGroup
				id={emailId}
				direction='vertical'
				label='Email address'
				error={errors.email?.message}
			>
				<Input
					type='email'
					id={emailId}
					// This makes this form better for password managers
					autoComplete='username'
					{...register('email')}
					disabled={isPendingLogin}
				/>
			</FormGroup>

			<FormGroup
				id={passwordId}
				direction='vertical'
				label='Password'
				error={errors.password?.message}
			>
				<Input
					type='password'
					id={passwordId}
					autoComplete='current-password'
					{...register('password')}
					disabled={isPendingLogin}
				/>
			</FormGroup>

			<ButtonContainer>
				<Button $size='large' disabled={isPendingLogin}>
					{isPendingLogin ? <SpinnerMini /> : 'Log In'}
				</Button>
			</ButtonContainer>
		</Form>
	);
}

export default LoginForm;

import UpdatePasswordForm from '@features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '@features/authentication/UpdateUserDataForm';
import Heading from '@ui/Heading';
import Stack from '@ui/Stack';

function Account() {
	return (
		<>
			<Heading>Update your account</Heading>

			<Stack>
				<Heading as='h3'>Update user data</Heading>
				<UpdateUserDataForm />
			</Stack>

			<Stack>
				<Heading as='h3'>Update password</Heading>
				<UpdatePasswordForm />
			</Stack>
		</>
	);
}

export default Account;

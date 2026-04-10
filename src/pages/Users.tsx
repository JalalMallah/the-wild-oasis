import SignUpForm from '@features/authentication/SignUpForm';
import Heading from '@ui/Heading';

function Users() {
	return (
		<>
			<Heading>Create a new user</Heading>
			<SignUpForm />
		</>
	);
}

export default Users;

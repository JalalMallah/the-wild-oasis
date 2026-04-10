import UpdateSettingsForm from '@features/settings/UpdateSettingsForm';
import Heading from '@ui/Heading';
import Stack from '@ui/Stack';

function Settings() {
	return (
		<Stack>
			<Heading>Update hotel settings</Heading>
			<UpdateSettingsForm />
		</Stack>
	);
}

export default Settings;

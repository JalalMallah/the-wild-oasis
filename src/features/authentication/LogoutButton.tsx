import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import ButtonIcon from '@ui/ButtonIcon';
import SpinnerMini from '@ui/SpinnerMini';
import { useLogOut } from './useLogOut';

function LogoutButton() {
	const { isPendingLogout, logOut } = useLogOut();

	return (
		<ButtonIcon onClick={logOut} disabled={isPendingLogout}>
			{isPendingLogout ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</ButtonIcon>
	);
}

export default LogoutButton;

import Button from '@ui/Button';
import SpinnerMini from '@ui/SpinnerMini';
import { useCheckOut } from './useCheckOut';

type Props = {
	bookingId: number;
};

function CheckoutButton({ bookingId }: Props) {
	const { isPendingCheckOut, checkOut } = useCheckOut();

	return (
		<Button
			$size='small'
			onClick={() => checkOut(bookingId)}
			disabled={isPendingCheckOut}
		>
			{isPendingCheckOut ? <SpinnerMini /> : 'Check out'}
		</Button>
	);
}

export default CheckoutButton;

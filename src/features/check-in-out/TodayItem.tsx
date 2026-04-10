import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTES } from '@constants/routes';
import type { BookingWithRelations } from '@features/bookings/types';
import Button from '@ui/Button';
import { Flag } from '@ui/Flag';
import Tag from '@ui/Tag';
import CheckoutButton from './CheckoutButton';

type Props = {
	activity: BookingWithRelations;
};

const StyledTodayItem = styled.li`
	display: grid;
	grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
	gap: 1.2rem;
	align-items: center;

	font-size: 1.4rem;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`;

const Guest = styled.div`
	font-weight: 500;
`;

function TodayItem({ activity }: Props) {
	const { status, guests, numNights, id } = activity;

	return (
		<StyledTodayItem>
			{status === 'unconfirmed' && <Tag $type='green'>Arriving</Tag>}
			{status === 'checked-in' && <Tag $type='blue'>Departing</Tag>}

			<Flag src={guests?.countryFlag ?? ''} alt={`Flag of ${guests?.nationality}`} />
			<Guest>{guests.fullName}</Guest>
			<span>{numNights} nights</span>

			{status === 'unconfirmed' && (
				<Button $size='small' as={Link} to={ROUTES.CHECK_IN(id)}>
					Check in
				</Button>
			)}
			{status === 'checked-in' && <CheckoutButton bookingId={id} />}
		</StyledTodayItem>
	);
}

export default TodayItem;

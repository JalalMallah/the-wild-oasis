import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const pageSize = Number(import.meta.env.VITE_BOOKINGS_PAGE_SIZE);

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Text = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const Button = styled.button<{ $active?: boolean }>`
	background-color: ${props =>
		props.$active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
	color: ${props => (props.$active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

type Props = {
	total: number;
};

function Pagination({ total }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = searchParams.get('page')
		? Number(searchParams.get('page'))
		: 1;

	const pageCount = Math.ceil(total / pageSize);

	if (pageCount <= 1) return null;

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pageCount;

	const showingFrom = (currentPage - 1) * pageSize + 1;
	const showingTo = Math.min(currentPage * pageSize, total);

	const handlePrevious = () => {
		const previousPage = isFirstPage ? currentPage : currentPage - 1;

		searchParams.set('page', previousPage.toString());
		setSearchParams(searchParams);
	};

	const handleNext = () => {
		const nextPage = isLastPage ? currentPage : currentPage + 1;

		searchParams.set('page', nextPage.toString());
		setSearchParams(searchParams);
	};

	return (
		<StyledPagination>
			<Text>
				Showing <span>{showingFrom}</span> to <span>{showingTo}</span> of{' '}
				<span>{total}</span> results.
			</Text>

			<ButtonGroup>
				<Button onClick={handlePrevious} disabled={isFirstPage}>
					<HiChevronLeft /> <span>Previous</span>
				</Button>
				<Button onClick={handleNext} disabled={isLastPage}>
					<span>Next</span> <HiChevronRight />
				</Button>
			</ButtonGroup>
		</StyledPagination>
	);
}

export default Pagination;

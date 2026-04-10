import CabinControls from '@features/cabins/CabinControls';
import CabinTable from '@features/cabins/CabinTable';
import CreateCabinFormToggle from '@features/cabins/CreateCabinFormToggle';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import Stack from '@ui/Stack';

function Cabins() {
	return (
		<>
			<Row>
				<Heading>All cabins</Heading>
				<CabinControls />
			</Row>

			<Stack>
				<CabinTable />
				<CreateCabinFormToggle />
			</Stack>
		</>
	);
}

export default Cabins;

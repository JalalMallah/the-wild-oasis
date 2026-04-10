import Heading from '@ui/Heading';
import Row from '@ui/Row';

import DashboardFilter from '@features/dashboard/DashboardFilter';
import DashboardLayout from '@features/dashboard/DashboardLayout';

function Dashboard() {
	return (
		<>
			<Row>
				<Heading>Dashboard</Heading>
				<DashboardFilter />
			</Row>

			<DashboardLayout />
		</>
	);
}

export default Dashboard;

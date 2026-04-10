import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import ProtectedRoute from '@features/authentication/ProtectedRoute';
import Account from '@pages/Account';
import BookingDetails from '@pages/BookingDetails';
import Bookings from '@pages/Bookings';
import Cabins from '@pages/Cabins';
import CheckIn from '@pages/CheckIn';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Settings from '@pages/Settings';
import Users from '@pages/Users';
import Layout from '@ui/Layout';

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
					<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTES.BOOKINGS} element={<Bookings />} />
					<Route
						path={`${ROUTES.BOOKINGS}/:bookingId`}
						element={<BookingDetails />}
					/>
					<Route path={ROUTES.CABINS} element={<Cabins />} />
					<Route path={ROUTES.USERS} element={<Users />} />
					<Route path={ROUTES.SETTINGS} element={<Settings />} />
					<Route path={ROUTES.ACCOUNT} element={<Account />} />
					<Route path={'/check-in/:bookingId'} element={<CheckIn />} />
				</Route>

				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;

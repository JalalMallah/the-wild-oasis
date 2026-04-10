export const ROUTES = {
	DASHBOARD: '/dashboard',
	BOOKINGS: '/bookings',
	BOOKING_DETAILS: (bookingId: number) => `/bookings/${bookingId}`,
	CABINS: '/cabins',
	USERS: '/users',
	SETTINGS: '/settings',
	ACCOUNT: '/account',
	LOGIN: '/login',
	NOT_FOUND: '*',
	CHECK_IN: (bookingId: number) => `/check-in/${bookingId}`,
} as const;

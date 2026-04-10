export const BOOKING_STATUS = {
	ALL: 'all',
	CHECKED_OUT: 'checked-out',
	CHECKED_IN: 'checked-in',
	UNCONFIRMED: 'unconfirmed',
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

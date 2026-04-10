import type { Tables, TablesUpdate } from '@models/supabase';

export type Booking = Tables<'bookings'>;

type GuestUpdate = TablesUpdate<'guests'>;
type CabinUpdate = TablesUpdate<'cabins'>;

export type BookingWithRelations = Booking & {
	cabins: CabinUpdate;
	guests: GuestUpdate;
};

type DeepNonNullable<T> = {
	[K in keyof T]: T[K] extends object
		? DeepNonNullable<NonNullable<T[K]>>
		: NonNullable<T[K]>;
};

export type NonNullableBookingWithRelations = DeepNonNullable<BookingWithRelations>;

export type TagColor = 'blue' | 'green' | 'silver';

export type Status = 'unconfirmed' | 'checked-in' | 'checked-out';

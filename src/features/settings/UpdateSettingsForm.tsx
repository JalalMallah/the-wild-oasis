import Form from '@ui/Form';
import FormGroup from '@ui/FormGroup';
import Input from '@ui/Input';
import Spinner from '@ui/Spinner';
import type { ChangeEvent } from 'react';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();
	const { isPendingUpdate, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;
	if (!settings) return null;

	const { breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength } =
		settings;

	type SettingsKeys = keyof typeof settings;

	const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
		if (
			!e.target.value ||
			e.target.value === settings[e.target.name as SettingsKeys]
		)
			return;

		updateSetting({ [e.target.name]: e.target.value });
	};

	return (
		<Form>
			<FormGroup label='Minimum nights/booking' id='min-nights'>
				<Input
					type='number'
					id='min-nights'
					name='minBookingLength'
					defaultValue={minBookingLength ?? 0}
					onBlur={handleBlur}
					disabled={isPendingUpdate}
				/>
			</FormGroup>
			<FormGroup label='Maximum nights/booking' id='max-nights'>
				<Input
					type='number'
					id='max-nights'
					name='maxBookingLength'
					defaultValue={maxBookingLength ?? 0}
					onBlur={handleBlur}
					disabled={isPendingUpdate}
				/>
			</FormGroup>
			<FormGroup label='Maximum guests/booking' id='max-guests'>
				<Input
					type='number'
					id='max-guests'
					name='maxGuestsPerBooking'
					defaultValue={maxGuestsPerBooking ?? 0}
					onBlur={handleBlur}
					disabled={isPendingUpdate}
				/>
			</FormGroup>
			<FormGroup label='Breakfast price' id='breakfast-price'>
				<Input
					type='number'
					id='breakfast-price'
					name='breakfastPrice'
					defaultValue={breakfastPrice ?? 0}
					onBlur={handleBlur}
					disabled={isPendingUpdate}
				/>
			</FormGroup>
		</Form>
	);
}

export default UpdateSettingsForm;

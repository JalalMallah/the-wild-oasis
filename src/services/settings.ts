import type { TablesUpdate } from '@models/supabase';
import { supabase } from './supabase';

type SettingsUpdate = TablesUpdate<'settings'>;

export async function getSettings() {
	const { data, error } = await supabase.from('settings').select('*').single();

	if (error) {
		console.error(error);
		throw new Error('Failed to load settings.');
	}
	return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: SettingsUpdate) {
	const { data, error } = await supabase
		.from('settings')
		.update(newSetting)
		// There is only ONE row of settings, and it has the ID=1, and so this is the updated one
		.eq('id', 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Failed to update settings.');
	}
	return data;
}

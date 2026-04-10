import type { TablesInsert } from '../types/supabase';
import { supabase } from './supabase';

type CabinsInsert = TablesInsert<'cabins'>;

type CabinData = Omit<CabinsInsert, 'image'> & {
	image?: File | string | null;
};

export type CreateCabinInput = {
	cabinData: CabinData;
	isDuplicate?: boolean;
};

export type UpdateCabinInput = {
	id: number;
	cabinData: CabinData;
};

// ---------- Create ----------
export async function createCabin(
	cabinData: CabinData,
	isDuplicate: boolean = false,
) {
	const imageName =
		cabinData.image instanceof File
			? `${cabinData.image?.name}-${Math.random()}`.replaceAll('/', '')
			: '';

	const imagePath =
		typeof cabinData.image === 'string' &&
		cabinData.image.startsWith(import.meta.env.VITE_SUPABASE_URL)
			? cabinData.image
			: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create cabin
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...cabinData, image: imagePath }])
		.select()
		.single();

	if (error) throw new Error('Failed to create cabin.');

	if (isDuplicate) return data;

	// 2. Upload image
	const { error: uploadError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, cabinData.image);

	// 3. Delete the cabin IF uploading image fails
	if (uploadError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		throw new Error('Failed to upload image and create the cabin.');
	}

	return data;
}

// ---------- Read ----------
export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) throw new Error('Failed to load cabins.');

	return data;
}

// ---------- Update ----------
export async function updateCabin(id: number, cabinData: CabinData) {
	const imageName =
		cabinData.image instanceof File
			? `${cabinData.image?.name}-${Math.random()}`.replaceAll('/', '')
			: '';

	const imagePath =
		typeof cabinData.image === 'string' &&
		cabinData.image.startsWith(import.meta.env.VITE_SUPABASE_URL)
			? cabinData.image
			: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Update cabin
	const { data, error } = await supabase
		.from('cabins')
		.update({ ...cabinData, image: imagePath })
		.eq('id', id)
		.select()
		.single();

	if (error) throw new Error('Failed to update cabin.');

	// 2. Upload image ONLY IF a new image has been attached by user
	if (cabinData.image instanceof File) {
		const { error: uploadError } = await supabase.storage
			.from('cabin-images')
			.upload(imageName, cabinData.image);

		// 3. Delete the cabin IF uploading image fails
		if (uploadError) {
			await supabase.from('cabins').delete().eq('id', data.id);
			throw new Error('Failed to upload image and update the cabin.');
		}
	}

	return data;
}

// ---------- Delete ----------
export async function deleteCabin(id: number) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) throw new Error('Failed to delete cabin.');

	return;
}

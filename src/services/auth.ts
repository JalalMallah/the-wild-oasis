import type { UserAttributes, UserMetadata } from '@supabase/supabase-js';
import { supabase } from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

type SignUpArgs = {
	fullName: string;
	email: string;
	password: string;
};

type LogInArgs = {
	email: string;
	password: string;
};

export type UserUpdateInput = UserAttributes & UserMetadata;

export async function signUp({ fullName, email, password }: SignUpArgs) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});

	if (error) {
		console.error(error);
		throw new Error('Failed to sign up.');
	}

	return data;
}

export async function logIn({ email, password }: LogInArgs) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error);
		throw new Error('Failed to log in.');
	}

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error('Failed to load user data.');

	return data?.user;
}

export async function logOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error);
		throw new Error('Failed to log out.');
	}
}

export async function updateCurrentUser({
	password,
	fullName,
	avatar,
}: UserUpdateInput) {
	// 1. Update password OR fullName
	let userData = {};

	if (password) userData = { password };
	if (fullName) userData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(userData);

	if (error) {
		console.error(error);
		throw new Error('Failed to update user data.');
	}

	if (!avatar) return data;

	// 2. Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: uploadError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (uploadError) {
		console.error(error);
		throw new Error('Failed to upload avatar.');
	}

	// 3. Update avatar in the user
	const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (updateError) {
		console.error(error);
		throw new Error('Failed to update user avatar.');
	}

	return updatedUser;
}

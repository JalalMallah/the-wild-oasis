/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_API_KEY: string;
	readonly VITE_BOOKINGS_PAGE_SIZE: number;
	readonly VITE_DEFAULT_EMAIL: string;
	readonly VITE_DEFAULT_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

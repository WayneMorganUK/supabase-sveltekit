// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>
		}
		interface PageData {
			session: Session | null
			user: User | null
		}
		// interface Error {}
		// interface Platform {}
	}
}

export { };

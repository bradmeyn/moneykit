// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: string | null;
			// You can add other properties to locals if needed
			// For example, if you want to add the PrismaClient instance:
			// db: PrismaClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

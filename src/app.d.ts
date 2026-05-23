import type { Session, User } from 'better-auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Locals {
			session?: Session;
			user?: User;
		}
	}
}

export {};

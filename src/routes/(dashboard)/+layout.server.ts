import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.userId) {
		redirect(303, '/login');
	}
	return { userId: locals.userId };
};

// // Example unprotected route: src/routes/about/+page.server.ts
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ locals }) => {
// 	return {
// 		userId: locals.userId // This might be null if user is not logged in
// 	};
// };

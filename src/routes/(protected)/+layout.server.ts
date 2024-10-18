import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	// if (!locals.userId) {
	// 	redirect(303, '/login');
	// }
	return { userId: locals.userId };
};

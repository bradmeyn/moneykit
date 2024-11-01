import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log('locals', locals);
	return { isLoggedIn: locals.userId ? true : false };
};

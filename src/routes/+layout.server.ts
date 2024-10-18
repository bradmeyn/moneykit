import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log('root layout locals', locals);
	return { isLoggedIn: locals.userId ? true : false };
};

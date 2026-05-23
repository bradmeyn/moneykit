import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	kit: {
		alias: {
			$db: 'src/lib/server/db',
			$ui: 'src/lib/components/ui',
			$utils: 'src/lib/utils',
			$constants: 'src/lib/constants'
		},
		experimental: {
			remoteFunctions: true
		},
		adapter: adapter()
	}
};

export default config;

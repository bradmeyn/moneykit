import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			compilerOptions: {
				experimental: {
					async: true
				}
			},
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
		}),
		tailwindcss()
	],
	ssr: {
		noExternal: ['layerchart']
	}
});

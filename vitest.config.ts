import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		environment: 'node'
	},
	resolve: {
		alias: {
			$utils: resolve('./src/lib/utils'),
			$constants: resolve('./src/lib/constants'),
			$ui: resolve('./src/lib/components/ui'),
			$db: resolve('./src/db')
		}
	}
});

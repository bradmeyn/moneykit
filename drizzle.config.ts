import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;

console.log('DATABASE_URL', DATABASE_URL);

if (!DATABASE_URL) throw new Error('Missing database credentials');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'postgresql',
	verbose: true,
	strict: true,
	dbCredentials: {
		url: DATABASE_URL
	}
});

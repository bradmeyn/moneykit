import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error('Missing database credentials');

export default defineConfig({
	schema: './src/lib/server/DATABASE/schema.ts',
	out: './src/lib/server/DATABASE/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URL
	}
});

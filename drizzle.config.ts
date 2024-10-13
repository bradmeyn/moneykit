import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const { DB_URL } = process.env;

if (!DB_URL) {
	throw new Error('Missing database credentials');
}
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DB_URL
	}
});

import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const { DB_URL } = process.env;

console.log('DB_URL:', DB_URL);

if (!DB_URL) {
	throw new Error('Missing database credentials');
}
export default defineConfig({
	schema: './src/db/schema.ts',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DB_URL
	}
});

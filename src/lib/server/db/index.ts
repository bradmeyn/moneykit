// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/connect';

// You can specify any property from the node-postgres connection options
export const db = await drizzle('node-postgres', {
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

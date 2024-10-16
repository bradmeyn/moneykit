// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/connect';

import * as dotenv from 'dotenv';
dotenv.config();
const { DB_URL } = process.env;

// You can specify any property from the node-postgres connection options
export const db = await drizzle('node-postgres', {
	connection: {
		connectionString: DB_URL,
		ssl: false
	}
});

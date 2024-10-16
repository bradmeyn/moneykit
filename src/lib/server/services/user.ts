import { eq } from 'drizzle-orm';
import { users, type User, type NewUser } from '$db/schema';
import { db } from '$db/index';
import bcrypt from 'bcrypt';

export async function createUser(userData: Omit<NewUser, 'id' | 'createdAt'>): Promise<User> {
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	const newUser = await db
		.insert(users)
		.values({
			...userData,
			password: hashedPassword
		})
		.returning();
	return newUser[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
	const result = await db.select().from(users).where(eq(users.id, id));
	return result[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
	const result = await db.select().from(users).where(eq(users.email, email));
	return result[0];
}

export async function updateUser(
	id: number,
	userData: Partial<Omit<NewUser, 'id' | 'createdAt'>>
): Promise<User | undefined> {
	if (userData.password) {
		userData.password = await bcrypt.hash(userData.password, 10);
	}
	const updatedUser = await db.update(users).set(userData).where(eq(users.id, id)).returning();
	return updatedUser[0];
}

export async function validatePassword(email: string, password: string): Promise<boolean> {
	const user = await getUserByEmail(email);
	if (!user) return false;
	return bcrypt.compare(password, user.password);
}

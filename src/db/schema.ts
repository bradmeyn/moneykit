import { integer, pgTable, pgEnum, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';

export const frequencyEnum = pgEnum('frequency', [
	'daily',
	'weekly',
	'fortnightly',
	'monthly',
	'quarterly',
	'half-yearly',
	'annually'
]);

export type Frequency = typeof frequencyEnum.enumValues;

const timestamps = {
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
};

const ids = {
	id: uuid().primaryKey(),
	userId: uuid('user_id').notNull()
};

export const users = pgTable('users', {
	id: uuid().primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	...timestamps
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Balance Sheet

export const assets = pgTable('assets', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	...timestamps,
	...ids
});
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

export const liabilities = pgTable('liabilities', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	interestRate: integer('interest_rate').notNull(),
	repaymentAmount: integer('repayment_amount').notNull(),
	repaymentFrequency: frequencyEnum('repayment_frequency').notNull(),
	remainingTerm: integer('remaining_term').notNull(),
	...timestamps,
	...ids
});
export type Liability = typeof liabilities.$inferSelect;
export type NewLiability = typeof liabilities.$inferInsert;

// Budget
export const incomes = pgTable('incomes', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: frequencyEnum().notNull(),
	category: varchar({ length: 255 }).notNull().default(''),
	...ids,
	...timestamps
});
export type Income = typeof incomes.$inferSelect;
export type NewIncome = typeof incomes.$inferInsert;

export const expenses = pgTable('expenses', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: frequencyEnum().notNull(),
	category: varchar({ length: 255 }).notNull().default(''),
	...ids,
	...timestamps
});
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

export const savings = pgTable('savings', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: frequencyEnum().notNull(),
	category: varchar({ length: 255 }).notNull().default(''),
	...ids,
	...timestamps
});
export type Saving = typeof savings.$inferSelect;
export type NewSaving = typeof savings.$inferInsert;

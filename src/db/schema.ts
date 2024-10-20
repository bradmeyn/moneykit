import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Balance Sheet

export const assets = pgTable('assets', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

export const liabilities = pgTable('liabilities', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	interestRate: integer('interest_rate').notNull(),
	repaymentAmount: integer('repayment_amount').notNull(),
	repaymentFrequency: integer('repayment_frequency').notNull(),
	remainingTerm: integer('remaining_term').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});
export type Liability = typeof liabilities.$inferSelect;
export type NewLiability = typeof liabilities.$inferInsert;

// Budget
export const incomes = pgTable('incomes', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: integer().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});
export type Income = typeof incomes.$inferSelect;
export type NewIncome = typeof incomes.$inferInsert;

export const expenses = pgTable('expenses', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: integer().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

export const savings = pgTable('savings', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: integer().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id)
});
export type Saving = typeof savings.$inferSelect;
export type NewSaving = typeof savings.$inferInsert;

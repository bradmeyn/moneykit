import {
	integer,
	pgTable,
	pgEnum,
	timestamp,
	varchar,
	uuid,
	numeric,
	text,
	boolean
} from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const frequencyEnum = pgEnum('frequency', [
	'daily',
	'weekly',
	'fortnightly',
	'monthly',
	'quarterly',
	'half_yearly',
	'annually'
]);

export type Frequency = typeof frequencyEnum.enumValues;

const timestamps = {
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
};

const ids = {
	id: uuid().primaryKey().$defaultFn(uuidv4),
	userId: uuid('user_id').notNull()
};

export const users = pgTable('users', {
	id: uuid().primaryKey().$defaultFn(uuidv4),
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
	value: integer().notNull(),
	purchaseDate: timestamp('purchase_date').notNull(),
	purchasePrice: integer('purchase_price').notNull(),
	...timestamps,
	...ids
});
export type Asset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

export const liabilityTypeEnum = pgEnum('liability_type', [
	'credit_card',
	'home_loan',
	'car_loan',
	'personal_loan',
	'student_loan',
	'line_of_credit',
	'business_loan',
	'investment_loan',
	'other'
]);

export const liabilities = pgTable('liabilities', {
	name: text().notNull(),
	balance: numeric('balance', { precision: 10, scale: 2 }).notNull(),
	type: liabilityTypeEnum('type').notNull(),
	interestRate: numeric('interest_rate', { precision: 6, scale: 4 }).notNull(),
	repaymentAmount: numeric('repayment_amount', { precision: 10, scale: 2 }).notNull(),
	repaymentFrequency: frequencyEnum('repayment_frequency').notNull(),
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

export const subscriptions = pgTable('subscriptions', {
	name: varchar({ length: 255 }).notNull(),
	amount: integer().notNull(),
	frequency: frequencyEnum().notNull(),
	category: varchar({ length: 255 }).notNull().default(''),
	paymentDate: timestamp('payment_date').notNull(),
	...ids,
	...timestamps
});

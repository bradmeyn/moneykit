import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { user } from './auth';

const timestamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date())
};

const userId = text('user_id')
	.notNull()
	.references(() => user.id, { onDelete: 'cascade' });

export const subscriptionTable = pgTable('subscriptions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId,
	name: text('name').notNull(),
	amount: integer('amount').notNull(), // in cents
	frequency: text('frequency').notNull(), // 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly'
	nextDueDate: timestamp('next_due_date').notNull(),
	category: text('category'),
	notes: text('notes'),
	active: boolean('active').notNull().default(true),
	...timestamps
});

export const assetTable = pgTable('assets', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId,
	name: text('name').notNull(),
	value: integer('value').notNull(), // in cents
	category: text('category').notNull(), // 'cash' | 'property' | 'vehicle' | 'other'
	notes: text('notes'),
	...timestamps
});

export const liabilityTable = pgTable('liabilities', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId,
	name: text('name').notNull(),
	balance: integer('balance').notNull(), // in cents
	interestRate: integer('interest_rate'), // basis points e.g. 500 = 5.00%
	category: text('category').notNull(), // 'mortgage' | 'personal_loan' | 'credit_card' | 'other'
	notes: text('notes'),
	...timestamps
});

export const incomeTable = pgTable('income_entries', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId,
	name: text('name').notNull(),
	amount: integer('amount').notNull(), // in cents per payment
	frequency: text('frequency').notNull(), // 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly'
	category: text('category'),
	...timestamps
});

export type Subscription = typeof subscriptionTable.$inferSelect;
export type Asset = typeof assetTable.$inferSelect;
export type Liability = typeof liabilityTable.$inferSelect;
export type Income = typeof incomeTable.$inferSelect;

import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './auth';

const timesStamps = {
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date())
};

const userId = text('user_id')
	.notNull()
	.references(() => user.id, { onDelete: 'cascade' });

export const portfolioTable = pgTable('portfolio', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId,
	name: text('name').notNull(),
	...timesStamps
});

export const holdingTable = pgTable('holding', {
	id: uuid('id').defaultRandom().primaryKey(),
	portfolioId: uuid('portfolio_id')
		.notNull()
		.references(() => portfolioTable.id, { onDelete: 'cascade' }),
	investmentId: uuid('investment_id')
		.notNull()
		.references(() => investmentTable.id, { onDelete: 'cascade' }),
	...timesStamps
});

export const transactionTable = pgTable('transaction', {
	id: uuid('id').defaultRandom().primaryKey(),
	holdingId: uuid('holding_id')
		.notNull()
		.references(() => holdingTable.id, { onDelete: 'cascade' }),
	quantity: integer('quantity').notNull(),
	pricePerUnit: integer('price_per_unit').notNull(),
	brokerage: integer('brokerage').notNull().default(0), // in cents
	transactionDate: timestamp('transaction_date').notNull(),
	type: text('type').notNull(), // 'buy', 'sell', or 'reinvestment'
	...timesStamps
});

export const investmentTable = pgTable('investment', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: text('name').notNull(),
	code: text('code').notNull(),
	managementFee: integer('management_fee').notNull().default(0), // in basis points
	type: text('type').notNull(), // e.g., 'stock', 'bond', etc.
	...timesStamps
});

export const distributionTable = pgTable('distribution', {
	id: uuid('id').defaultRandom().primaryKey(),
	holdingId: uuid('holding_id')
		.notNull()
		.references(() => holdingTable.id, { onDelete: 'cascade' }),
	datePaid: timestamp('date_paid').notNull(),
	// All amounts stored in cents
	grossPayment: integer('gross_payment').notNull().default(0),
	taxWithheld: integer('tax_withheld').notNull().default(0),
	// Reinvestment details
	reinvested: boolean('reinvested').notNull().default(false),
	...timesStamps
});

export const portfolioRelations = relations(portfolioTable, ({ many }) => ({
	holdings: many(holdingTable)
}));

export const holdingRelations = relations(holdingTable, ({ many, one }) => ({
	portfolio: one(portfolioTable, {
		fields: [holdingTable.portfolioId],
		references: [portfolioTable.id]
	}),
	investment: one(investmentTable, {
		fields: [holdingTable.investmentId],
		references: [investmentTable.id]
	}),
	transactions: many(transactionTable),
	distributions: many(distributionTable)
}));

export const transactionRelations = relations(transactionTable, ({ one }) => ({
	holding: one(holdingTable, {
		fields: [transactionTable.holdingId],
		references: [holdingTable.id]
	})
}));

export const distributionRelations = relations(distributionTable, ({ one }) => ({
	holding: one(holdingTable, {
		fields: [distributionTable.holdingId],
		references: [holdingTable.id]
	})
}));

export type Transaction = typeof transactionTable.$inferSelect;
export type Investment = typeof investmentTable.$inferSelect;
export type Distribution = typeof distributionTable.$inferSelect;
export type Holding = typeof holdingTable.$inferSelect;

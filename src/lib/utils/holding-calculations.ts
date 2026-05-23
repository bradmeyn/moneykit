/**
 * Holding calculation utilities
 * Pure functions for calculating holding metrics from transactions
 */

import type { Transaction } from '$db/schemas/portfolio';

export interface HoldingMetrics {
	units: number;
	averagePrice: number;
	costBase: number;
}

export interface UnrealisedMetrics extends HoldingMetrics {
	currentPrice: number;
	currentValue: number;
	unrealisedGain: number;
	unrealisedGainPercent: number;
}

/**
 * Calculate holding metrics from transactions
 * Handles buy, sell, and reinvestment transactions
 *
 * @param transactions - Array of transactions for a holding
 * @returns Units held, average price, and cost base
 */
export function calculateHoldingMetrics(transactions: Transaction[]): HoldingMetrics {
	let totalUnits = 0;
	let totalCost = 0;

	for (const transaction of transactions) {
		if (transaction.type === 'buy' || transaction.type === 'reinvestment') {
			totalUnits += transaction.quantity;
			totalCost += transaction.quantity * transaction.pricePerUnit;
		} else if (transaction.type === 'sell') {
			totalUnits -= transaction.quantity;
		}
	}

	const averagePrice = totalUnits > 0 ? Math.round(totalCost / totalUnits) : 0;
	const costBase = totalUnits > 0 ? totalUnits * averagePrice : 0;

	return { units: totalUnits, averagePrice, costBase };
}

/**
 * Calculate unrealised gain metrics for a holding
 *
 * @param transactions - Array of transactions for a holding
 * @param currentPrice - Current market price per unit
 * @returns Complete metrics including unrealised gains
 */
export function calculateUnrealisedMetrics(
	transactions: Transaction[],
	currentPrice: number
): UnrealisedMetrics {
	const { units, averagePrice, costBase } = calculateHoldingMetrics(transactions);

	const currentValue = units * currentPrice;
	const unrealisedGain = currentValue - costBase;
	const unrealisedGainPercent = costBase > 0 ? (unrealisedGain / costBase) * 100 : 0;

	return {
		units,
		averagePrice,
		costBase,
		currentPrice,
		currentValue,
		unrealisedGain,
		unrealisedGainPercent
	};
}

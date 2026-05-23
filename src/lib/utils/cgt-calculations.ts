/**
 * Pure CGT calculation functions for Australian tax
 * These functions are separated from the data fetching logic to make them testable
 */

export interface RealisedGain {
	holdingName: string;
	holdingCode: string;
	saleDate: Date;
	quantity: number;
	proceeds: number; // in cents
	costBase: number; // in cents
	gain: number; // in cents
	isLongTerm: boolean; // held > 12 months
}

export interface TaxLot {
	date: Date;
	quantity: number;
	costPerUnit: number; // in cents
	holdingId: string;
	holdingName: string;
	holdingCode: string;
}

export interface CGTCalculation {
	shortTermGains: number;
	lossesAppliedToShortTerm: number;
	shortTermAfterLosses: number;
	longTermGains: number;
	lossesAppliedToLongTerm: number;
	longTermAfterLosses: number;
	cgtDiscount: number;
	longTermTaxable: number;
	totalTaxableGain: number;
}

/**
 * Calculate if a holding period qualifies for long-term CGT discount (> 12 months)
 */
export function isLongTermHolding(purchaseDate: Date, saleDate: Date): boolean {
	const holdingPeriodMs = saleDate.getTime() - purchaseDate.getTime();
	const oneYearMs = 365 * 24 * 60 * 60 * 1000;
	return holdingPeriodMs > oneYearMs;
}

/**
 * Calculate realised gains from a sale transaction using FIFO
 */
export function calculateRealisedGains(
	taxLots: TaxLot[],
	quantity: number,
	salePrice: number,
	saleDate: Date
): { gains: RealisedGain[]; remainingLots: TaxLot[] } {
	const gains: RealisedGain[] = [];
	const lots = [...taxLots]; // Clone to avoid mutation
	let remainingToSell = quantity;

	while (remainingToSell > 0 && lots.length > 0) {
		const lot = lots[0];
		const quantityFromLot = Math.min(lot.quantity, remainingToSell);

		const proceeds = quantityFromLot * salePrice;
		const costBase = quantityFromLot * lot.costPerUnit;
		const gain = proceeds - costBase;
		const isLongTerm = isLongTermHolding(lot.date, saleDate);

		gains.push({
			holdingName: lot.holdingName,
			holdingCode: lot.holdingCode,
			saleDate,
			quantity: quantityFromLot,
			proceeds,
			costBase,
			gain,
			isLongTerm
		});

		lot.quantity -= quantityFromLot;
		remainingToSell -= quantityFromLot;

		if (lot.quantity === 0) {
			lots.shift();
		}
	}

	return { gains, remainingLots: lots };
}

/**
 * Calculate CGT with loss offsetting and discount
 * Losses are applied to short-term gains first, then long-term gains
 * Long-term gains receive a 50% discount
 */
export function calculateCGT(
	shortTermGains: number,
	longTermGains: number,
	capitalLosses: number
): CGTCalculation {
	const totalLosses = Math.abs(capitalLosses);
	let remainingLosses = totalLosses;

	// Apply losses to short-term gains first
	const lossesAppliedToShortTerm = Math.min(remainingLosses, shortTermGains);
	remainingLosses -= lossesAppliedToShortTerm;
	const shortTermAfterLosses = shortTermGains - lossesAppliedToShortTerm;

	// Apply remaining losses to long-term gains
	const lossesAppliedToLongTerm = Math.min(remainingLosses, longTermGains);
	const longTermAfterLosses = longTermGains - lossesAppliedToLongTerm;

	// Apply 50% CGT discount to long-term gains
	const cgtDiscount = longTermAfterLosses > 0 ? longTermAfterLosses * 0.5 : 0;
	const longTermTaxable = longTermAfterLosses - cgtDiscount;

	const totalTaxableGain = shortTermAfterLosses + longTermTaxable;

	return {
		shortTermGains,
		lossesAppliedToShortTerm,
		shortTermAfterLosses,
		longTermGains,
		lossesAppliedToLongTerm,
		longTermAfterLosses,
		cgtDiscount,
		longTermTaxable,
		totalTaxableGain
	};
}

/**
 * Get the current Australian Financial Year dates
 * FY runs from July 1 to June 30
 */
export function getCurrentFinancialYear(date: Date = new Date()): {
	year: number;
	start: Date;
	end: Date;
	label: string;
} {
	const fyYear = date.getMonth() >= 6 ? date.getFullYear() : date.getFullYear() - 1;
	const start = new Date(fyYear, 6, 1); // July 1
	const end = new Date(fyYear + 1, 5, 30, 23, 59, 59); // June 30

	return {
		year: fyYear,
		start,
		end,
		label: `FY${fyYear}-${fyYear + 1}`
	};
}

/**
 * Filter gains for a specific financial year
 */
export function filterGainsByFinancialYear(
	gains: RealisedGain[],
	fyStart: Date,
	fyEnd: Date
): RealisedGain[] {
	return gains.filter((g) => g.saleDate >= fyStart && g.saleDate <= fyEnd);
}

/**
 * Calculate unrealised gain for a tax lot
 */
export function calculateUnrealisedGain(
	lot: TaxLot,
	currentPrice: number
): {
	unrealisedGain: number;
	currentValue: number;
	costBase: number;
	isLongTerm: boolean;
} {
	const costBase = lot.quantity * lot.costPerUnit;
	const currentValue = lot.quantity * currentPrice;
	const unrealisedGain = currentValue - costBase;
	const isLongTerm = isLongTermHolding(lot.date, new Date());

	return {
		unrealisedGain,
		currentValue,
		costBase,
		isLongTerm
	};
}

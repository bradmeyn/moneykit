// Current financial year
export const CURRENT_FINANCIAL_YEAR = '2024-25';

// Income tax brackets
export const INCOME_TAX_BRACKETS = [
	{ min: 0, max: 18200, rate: 0 },
	{ min: 18201, max: 45000, rate: 0.19 },
	{ min: 45001, max: 120000, rate: 0.325 },
	{ min: 120001, max: 180000, rate: 0.37 },
	{ min: 180001, max: Infinity, rate: 0.45 }
];

function calculateIncomeTax(taxableIncome: number) {
	let tax = 0;
	for (const bracket of INCOME_TAX_BRACKETS) {
		if (taxableIncome > bracket.max) {
			tax += (bracket.max - bracket.min) * bracket.rate;
		} else if (taxableIncome > bracket.min) {
			tax += (taxableIncome - bracket.min) * bracket.rate;
			break; // Exiting the loop as the income falls within this bracket
		}
	}
	return tax;
}

// Low Income Tax Offset
export const LOW_INCOME_TAX_OFFSET = [
	{ min: 0, max: 37500, reduction: 0, amount: 700 },
	{ min: 37501, max: 45000, reduction: 0.05, amount: 700 },
	{ min: 45001, max: 66667, reduction: 0.0125, amount: 325 }
];

function calculateLowIncomeOffset(taxableIncome: number) {
	let offset = 0;
	for (const bracket of LOW_INCOME_TAX_OFFSET) {
		if (taxableIncome > bracket.min) {
			offset = bracket.amount - (taxableIncome - bracket.min) * bracket.reduction;
			break;
		}
	}
	return offset;
}

// Medicare Levy
export const MEDICARE_LEVY = [
	{ min: 0, max: 26000, rate: 0 },
	{ min: 26001, max: 32500, rate: 0.1 },
	{ min: 32501, max: Infinity, rate: 0.02 }
];

// Medicare Levy for Seniors and Pensioners (new)
export const MEDICARE_LEVY_SENIORS = [
	{ min: 0, max: 41089, rate: 0 },
	{ min: 41090, max: 51361, rate: 0.1 },
	{ min: 51362, max: Infinity, rate: 0.02 }
];

// Medicare Levy Surcharge (updated)
export const MEDICARE_LEVY_SURCHARGE = [
	{ min: 0, max: 97000, rate: 0 },
	{ min: 97001, max: 113000, rate: 0.01 },
	{ min: 113001, max: 151000, rate: 0.0125 },
	{ min: 151001, max: Infinity, rate: 0.015 }
];

// HELP Repayment Rates for 2024/25
export const HELP_REPAYMENT_RATES = [
	{ min: 0, max: 54434, rate: 0 },
	{ min: 54435, max: 62850, rate: 0.01 },
	{ min: 62851, max: 66620, rate: 0.02 },
	{ min: 66621, max: 70618, rate: 0.025 },
	{ min: 70619, max: 74855, rate: 0.03 },
	{ min: 74856, max: 79346, rate: 0.035 },
	{ min: 79347, max: 84107, rate: 0.04 },
	{ min: 84108, max: 89154, rate: 0.045 },
	{ min: 89155, max: 94503, rate: 0.05 },
	{ min: 94504, max: 100174, rate: 0.055 },
	{ min: 100175, max: 106185, rate: 0.06 },
	{ min: 106186, max: 112556, rate: 0.065 },
	{ min: 112557, max: 119309, rate: 0.07 },
	{ min: 119310, max: 126467, rate: 0.075 },
	{ min: 126468, max: 134056, rate: 0.08 },
	{ min: 134057, max: 142100, rate: 0.085 },
	{ min: 142101, max: 150626, rate: 0.09 },
	{ min: 150627, max: 159663, rate: 0.095 },
	{ min: 159664, max: Infinity, rate: 0.1 }
];

export function calculateHELPRepayment(income: number) {
	for (const bracket of HELP_REPAYMENT_RATES) {
		if (income <= bracket.max) {
			return income * bracket.rate;
		}
	}
	// If income exceeds all brackets, use the highest rate
	return income * 0.1;
}

// Helper function to calculate Medicare Levy
export function calculateMedicareLevy(income: number, isSenior: boolean = false) {
	const levyBrackets = isSenior ? MEDICARE_LEVY_SENIORS : MEDICARE_LEVY;
	for (const bracket of levyBrackets) {
		if (income <= bracket.max) {
			if (bracket.rate === 0.1) {
				return (income - bracket.min) * bracket.rate;
			}
			return income * bracket.rate;
		}
	}
	return income * 0.02; // Default to 2% if income exceeds all brackets
}

// Helper function to calculate Medicare Levy Surcharge
export function calculateMedicareLevySurcharge(income: number) {
	for (const bracket of MEDICARE_LEVY_SURCHARGE) {
		if (income <= bracket.max) {
			return income * bracket.rate;
		}
	}
	return income * 0.015; // Default to 1.5% if income exceeds all brackets
}

export function calculatePersonalTax(
	income: number,
	deductions: number,
	hasInsurance: boolean,
	hasHelpDebt: boolean
) {
	let totalTax = 0;

	const taxableIncome = income - deductions;

	// Calculate income tax based on brackets
	let incomeTax = calculateIncomeTax(taxableIncome);
	const lowIncomeOffset = calculateLowIncomeOffset(taxableIncome);
	const medicareLevy = calculateMedicareLevy(income);
	const medicareLevySurcharge = hasInsurance ? 0 : calculateMedicareLevySurcharge(income);
	const helpRepayment = hasHelpDebt ? calculateHELPRepayment(income) : 0;

	// Apply low income offset cap
	incomeTax -= lowIncomeOffset;
	if (incomeTax < 0) {
		incomeTax = 0;
	}

	totalTax = incomeTax + medicareLevy + medicareLevySurcharge + helpRepayment;

	return {
		income,
		deductions,
		taxableIncome,
		lowIncomeOffset,
		incomeTax,
		medicareLevy,
		medicareLevySurcharge,
		helpRepayment,
		totalTax
	};
}

import { type DrawdownResult } from './types';

export function calculateDrawdown(
	principal: number,
	interestRate: number,
	annualWithdrawal: number
): DrawdownResult {
	if (principal <= 0 || interestRate < 0 || annualWithdrawal <= 0) {
		return {
			yearsLasted: 0,
			remainingBalance: 0,

			totalInterest: 0,

			totalWithdrawn: 0,
			annualData: []
		};
	}

	let balance = principal;
	let yearsLasted = 0;
	let totalWithdrawn = 0;
	let totalInterest = 0;
	const annualData = [];
	const maxYears = 50; // Maximum number of years to calculate

	while (balance > 0 && yearsLasted < maxYears) {
		const startingBalance = balance;
		const interestEarned = balance * interestRate;
		totalInterest += interestEarned;
		balance += interestEarned;

		const withdrawal = Math.min(annualWithdrawal, balance);
		totalWithdrawn += withdrawal;
		balance -= withdrawal;

		yearsLasted++;

		annualData.push({
			year: yearsLasted,
			startingBalance: parseFloat(startingBalance.toFixed(2)),
			interestEarned: parseFloat(interestEarned.toFixed(2)),
			withdrawal: parseFloat(withdrawal.toFixed(2)),
			endingBalance: parseFloat(balance.toFixed(2))
		});

		if (withdrawal < annualWithdrawal) {
			break; // Funds depleted
		}
	}

	return {
		yearsLasted,
		remainingBalance: parseFloat(balance.toFixed(2)),
		totalInterest: parseFloat(totalInterest.toFixed(2)),

		totalWithdrawn: parseFloat(totalWithdrawn.toFixed(2)),
		annualData
	};
}

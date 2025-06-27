import { setContext, getContext } from 'svelte';
import { formatAsCurrency } from '$lib/utils/formatters';

class CalculatorState {
	ASSUMED_RETURNS = {
		highGrowth: 0.08,
		growth: 0.07,
		balanced: 0.05,
		conservative: 0.03,
		cash: 0.03
	};

	// Personal details
	age = $state(55);
	retirementAge = $state(67);
	retirementIncome = $state(52000);
	currentIncome = $state(85000);
	sgRate = $state(0.12);

	// Superannuation
	superannuationBalance = $state(500000);
	employerContribution = $derived(this.currentIncome * this.sgRate);
	additionalSuperContribution = $state(1000); // yearly

	// Investment returns
	accumulationReturn = $state(0.07);
	retirementReturn = $state(0.05);
	inflationRate = $state(0.02);

	investments = $state([
		{
			id: '1',
			name: '123 Main St',
			type: 'property',
			value: 5000000,
			rentalIncome: 20000,
			expectedReturn: 0.05 // capital growth
		},
		{
			id: '2',
			name: 'Personal Investment Account',
			type: 'shares',
			value: 150000,
			expectedReturn: 0.07
		},
		{
			id: '3',
			name: 'Bank Savings Account',
			type: 'cash',
			value: 50000,
			expectedReturn: 0.04
		}
	]);

	removeInvestment(id: string) {
		this.investments = this.investments.filter((investment) => investment.id !== id);
	}

	// Home Ownership (pension)
	isHomeOwner = $state(true);

	// Calculate total value of non-super investments
	getTotalInvestmentsValue = $derived(
		this.investments.reduce((total, investment) => total + investment.value, 0)
	);

	outcome = $derived.by(() => {
		const currentYear = new Date().getFullYear();
		const currentAge = this.age;
		let balance = this.superannuationBalance;

		// Use investments array for non-super assets
		let investmentsValues = [...this.investments.map((inv) => inv.value)];

		const yearlyData = [];
		let balanceAtRetirement = 0;

		// Calculate years until retirement
		const yearsUntilRetirement = this.retirementAge - currentAge;
		// Calculate years to project until
		const totalYearsToProject = yearsUntilRetirement + 30;

		for (let year = 0; year <= totalYearsToProject; year++) {
			const currentYearNum = currentYear + year;
			const ageThisYear = currentAge + year;
			const isRetired = ageThisYear >= this.retirementAge;

			// Step 1: Accumulation phase
			if (!isRetired) {
				// Apply employer and additional contributions
				const totalContributions = this.employerContribution + this.additionalSuperContribution;

				// Apply investment return on balance before adding this year's contribution
				balance = balance * (1 + this.accumulationReturn);

				// Add contributions
				balance += totalContributions;

				// Apply investment return on other investments (each with its own rate)
				investmentsValues = investmentsValues.map(
					(value, index) => value * (1 + this.investments[index].expectedReturn)
				);
			}
			// Step 2: Retirement phase
			else {
				// Record balance at retirement for the first year of retirement
				if (ageThisYear === this.retirementAge) {
					balanceAtRetirement = balance;
				}

				// Calculate inflation-adjusted income needed for this year
				const yearsInRetirement = ageThisYear - this.retirementAge;
				const inflationFactor = Math.pow(1 + this.inflationRate, yearsInRetirement);
				const adjustedIncomeNeeded = this.retirementIncome * inflationFactor;

				// Calculate investment returns (before withdrawal)
				balance = balance * (1 + this.retirementReturn);

				// Apply investment returns to each investment
				investmentsValues = investmentsValues.map(
					(value, index) => value * (1 + this.investments[index].expectedReturn)
				);

				// Withdraw retirement income (prioritize super balance)
				if (balance >= adjustedIncomeNeeded) {
					balance -= adjustedIncomeNeeded;
				} else {
					// If super is insufficient, use other investments to cover the gap
					const gap = adjustedIncomeNeeded - balance;
					balance = 0;

					// Withdraw from investments proportionally to their values
					const totalInvestmentsValue = investmentsValues.reduce((sum, val) => sum + val, 0);

					if (totalInvestmentsValue > 0) {
						// Calculate proportional reduction for each investment
						investmentsValues = investmentsValues.map((value) => {
							const proportion = value / totalInvestmentsValue;
							return Math.max(0, value - gap * proportion);
						});
					}
				}
			}

			// Calculate total investments value for this year
			const totalInvestmentsValue = investmentsValues.reduce((sum, val) => sum + val, 0);

			yearlyData.push({
				year: currentYearNum,
				age: ageThisYear,
				isRetired,
				superannuationBalance: Math.round(balance),
				otherInvestmentsBalance: Math.round(totalInvestmentsValue),
				totalBalance: Math.round(balance + totalInvestmentsValue),
				yearsSinceRetirement: isRetired ? ageThisYear - this.retirementAge : null,
				incomeNeeded: isRetired
					? Math.round(
							this.retirementIncome *
								Math.pow(1 + this.inflationRate, ageThisYear - this.retirementAge)
						)
					: null,
				// Add detailed investments data
				investmentsBreakdown: this.investments.map((inv, idx) => ({
					name: inv.name,
					value: Math.round(investmentsValues[idx])
				}))
			});
		}

		// Calculate additional metrics
		const lastYearData = yearlyData[yearlyData.length - 1];
		const superDepleted = yearlyData.findIndex(
			(data) => data.isRetired && data.superannuationBalance <= 0
		);
		const superLongevity = superDepleted === -1 ? '30+' : superDepleted - yearsUntilRetirement;

		return {
			yearlyData,
			balanceAtRetirement,
			projectedBalanceAt87: lastYearData.superannuationBalance,
			superLongevity,
			fundingRatio: balanceAtRetirement / this.retirementIncome,
			sufficientFunding: lastYearData.superannuationBalance > 0
		};
	});

	// Calculate retirement data

	// Age, Year, Superannuation Balance, Other Investments Balance, Total Balance
	getAssetTableData() {
		const columns = ['Age', 'Superannuation Balance', 'Other Investments', 'Total Balance'];

		const rows = this.outcome.yearlyData.map((item) => [
			item.age,
			formatAsCurrency(item.superannuationBalance),
			formatAsCurrency(item.otherInvestmentsBalance),
			formatAsCurrency(item.totalBalance)
		]);

		return { columns, rows };
	}

	// Year, Age, Target, Super Drawdown, Other Investments Drawdown
	getIncomeTableData() {
		const columns = ['Age', 'Income Needed', 'Super Drawdown', 'Other Investments Drawdown'];

		// We'll need to calculate the drawdown amounts
		const rows = [];

		// We need to keep track of previous balances to calculate drawdowns
		let prevSuperBalance = this.superannuationBalance;
		let prevInvestmentsValues = [...this.investments.map((inv) => inv.value)];

		for (const item of this.outcome.yearlyData) {
			// Only include retirement years (when drawdowns occur)
			if (item.isRetired) {
				// Calculate expected balances after returns but before withdrawals
				const expectedSuperBalance = prevSuperBalance * (1 + this.retirementReturn);

				// Calculate expected value for each investment
				const expectedInvestmentsValues = this.investments.map(
					(inv, idx) => prevInvestmentsValues[idx] * (1 + inv.expectedReturn)
				);
				const expectedTotalInvestmentsValue = expectedInvestmentsValues.reduce(
					(sum, val) => sum + val,
					0
				);

				// Calculate drawdowns based on the difference between expected and actual balances
				let superDrawdown = 0;
				let otherDrawdown = 0;

				if (item.incomeNeeded) {
					if (expectedSuperBalance >= item.superannuationBalance) {
						superDrawdown = expectedSuperBalance - item.superannuationBalance;
					}

					if (expectedTotalInvestmentsValue >= item.otherInvestmentsBalance) {
						otherDrawdown = expectedTotalInvestmentsValue - item.otherInvestmentsBalance;
					}
				}

				rows.push([
					item.age,
					formatAsCurrency(item.incomeNeeded || 0),
					formatAsCurrency(Math.round(superDrawdown)),
					formatAsCurrency(Math.round(otherDrawdown))
				]);
			}

			// Update previous balances for next iteration
			prevSuperBalance = item.superannuationBalance;
			prevInvestmentsValues = item.investmentsBreakdown.map((inv) => inv.value);
		}

		return { columns, rows };
	}

	// New method to get detailed investment breakdown
	getInvestmentsBreakdown(year: number) {
		const yearData = this.outcome.yearlyData.find((data) => data.year === year);
		if (!yearData) return [];

		return yearData.investmentsBreakdown.map((inv) => ({
			name: inv.name,
			value: formatAsCurrency(inv.value)
		}));
	}
}

const CALCULATOR_KEY = Symbol('retirement-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new CalculatorState());
}

export function getCalculatorState() {
	return getContext<CalculatorState>(CALCULATOR_KEY);
}

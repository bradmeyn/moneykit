import { setContext, getContext } from 'svelte';

class CalculatorState {
	// Input state
	age = $state(34);
	expenses = $state(40000);
	currentInvestments = $state(200000);
	contributions = $state(1000); // monthly
	growthRate = $state(0.07);
	inflationRate = $state(0.02);
	withdrawalRate = $state(0.04);

	// Step 1: Calculate FIRE Number
	fireNumber = $derived(this.expenses / this.withdrawalRate);

	// Step 2: Calculate years to reach FIRE Number
	yearsToFire = $derived.by(() => {
		let amount = this.currentInvestments;
		const yearlyContribution = this.contributions * 12;
		const realGrowthRate = (1 + this.growthRate) / (1 + this.inflationRate) - 1;

		let years = 0;
		while (amount < this.fireNumber && years < 100) {
			// cap at 100 for safety
			amount = amount * (1 + realGrowthRate) + yearlyContribution;
			years++;
		}
		return years;
	});

	// In CalculatorState:
	calculationData = $derived.by(() => {
		const data = [];
		let amount = this.currentInvestments;
		const yearlyContribution = this.contributions * 12;
		const realGrowthRate = (1 + this.growthRate) / (1 + this.inflationRate) - 1;
		let isWithdrawing = false;

		// Start from current age and go to 67
		for (let age = this.age; age <= 67; age++) {
			const inflationAdjustedExpenses =
				this.expenses * Math.pow(1 + this.inflationRate, age - this.age);

			data.push({
				age,
				investmentValue: Math.round(amount),
				fireTarget: this.fireNumber,
				withdrawal: isWithdrawing ? Math.round(inflationAdjustedExpenses) : 0,
				contribution: !isWithdrawing ? yearlyContribution : 0
			});

			// If we've reached FIRE number, start withdrawing instead of contributing
			if (amount >= this.fireNumber) {
				isWithdrawing = true;
			}

			if (isWithdrawing) {
				amount = amount * (1 + realGrowthRate) - inflationAdjustedExpenses;
			} else {
				amount = amount * (1 + realGrowthRate) + yearlyContribution;
			}
		}

		return data;
	});
}

const CALCULATOR_KEY = Symbol('fire-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new CalculatorState());
}

export function getCalculatorState() {
	return getContext<CalculatorState>(CALCULATOR_KEY);
}

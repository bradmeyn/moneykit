import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';
import { calculateCompoundInterest, calculateBandData, buildTableData } from '$lib/utils/growth-calculations';

class FireCalculatorState {
	principal = $state(10000);
	years = $state(10);

	contributionAmount = $state(1000);
	contributionFrequency = $state<FrequencyType>('monthly');

	returnRate = $state(0.07);
	useVolatility = $state(false);
	volatility = $state(0.15);

	annualExpenses = $state(60000);
	withdrawalRate = $state(0.04);
	secondaryIncome = $state(0);

	fireNumber = $derived((this.annualExpenses - this.secondaryIncome) / this.withdrawalRate);

	result = $derived(
		calculateCompoundInterest(
			this.principal,
			this.returnRate,
			this.years,
			this.contributionAmount,
			FREQUENCIES[this.contributionFrequency].value,
			this.useVolatility ? this.volatility : 0
		)
	);

	yearsToFire = $derived.by(() => {
		const i = this.result.annualData.findIndex((d) => d.endingValue >= this.fireNumber);
		return i === -1 ? null : i + 1;
	});

	bandData = $derived(
		this.useVolatility
			? calculateBandData(
					this.principal,
					this.returnRate,
					this.years,
					this.contributionAmount,
					FREQUENCIES[this.contributionFrequency].value,
					this.volatility
				)
			: null
	);

	getTableData() {
		return buildTableData(this.result.annualData, this.useVolatility);
	}
}

const KEY = Symbol('fire-calculator');

export function setCalculatorState() {
	return setContext(KEY, new FireCalculatorState());
}

export function getCalculatorState() {
	return getContext<FireCalculatorState>(KEY);
}

// import { FREQUENCIES, type FrequencyType } from '$lib/constants/frequencies';
import { setContext, getContext } from 'svelte';

class MortgageCalculator {
	principal = $state(0);
	interestRate = $state(0.06);
	interestType = $state<'Variable' | 'Fixed'>('Variable');
	fixedTerm = $state('3');
	loanType = $state<'Principal & Interest' | 'Interest Only'>('Principal & Interest');
	offsetBalance = $state(0);
	term = $state(30);
}

const CALCULATOR_KEY = Symbol('mortgage-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new MortgageCalculator());
}

export function getCalculatorState() {
	return getContext<MortgageCalculator>(CALCULATOR_KEY);
}

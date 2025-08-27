import { setContext, getContext } from 'svelte';
import { calculatePersonalTax } from './tax-rates';

export type TaxInputs = {
	income: number;
	deductions: number;
	hasInsurance: boolean;
	hasHelpDebt: boolean;
};

export type TaxResult = {
	taxableIncome: number;
	incomeTax: number;
	lowIncomeOffset: number;
	helpRepayment: number;
	medicareLevy: number;
	medicareLevySurcharge: number;
	totalTax: number;
};

export function createCalculator() {
	let income = $state(100000);
	let deductions = $state(0);
	let hasInsurance = $state(false);
	let hasHelpDebt = $state(false);

	const result = $derived(calculatePersonalTax(income, deductions, hasInsurance, hasHelpDebt));

	return {
		set income(value: number) {
			income = value;
		},
		get income() {
			return income;
		},
		set deductions(value: number) {
			deductions = value;
		},
		get deductions() {
			return deductions;
		},
		set hasInsurance(value: boolean) {
			hasInsurance = value;
		},
		get hasInsurance() {
			return hasInsurance;
		},
		set hasHelpDebt(value: boolean) {
			hasHelpDebt = value;
		},
		get hasHelpDebt() {
			return hasHelpDebt;
		},
		get result() {
			return result;
		}
	};
}

const CALCULATOR_KEY = Symbol('tax-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, createCalculator());
}

export function getCalculatorState() {
	return getContext<ReturnType<typeof createCalculator>>(CALCULATOR_KEY);
}

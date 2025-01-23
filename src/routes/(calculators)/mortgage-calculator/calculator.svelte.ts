import { setContext, getContext } from 'svelte';

interface MortgageProjection {
	monthlyRepayment: number;
	totalInterest: number;
	totalRepayment: number;
	remainingPrincipal: number;
	monthlyBreakdown: Array<{
		month: number;
		principal: number;
		interest: number;
		balance: number;
		totalInterestPaid: number;
	}>;
}

class MortgageCalculator {
	principal = $state(700000);
	interestRate = $state(0.06);
	interestType = $state<'Variable' | 'Fixed'>('Variable');
	fixedTerm = $state('3');
	loanType = $state<'Principal & Interest' | 'Interest Only'>('Principal & Interest');
	ioTerm = $state('3');
	offsetBalance = $state(0);
	term = $state(30);

	// Derived helpers
	effectivePrincipal = $derived(Math.max(0, this.principal - this.offsetBalance));

	monthlyRate = $derived(this.interestRate / 12);

	totalMonths = $derived(this.term * 12);

	ioMonths = $derived(parseInt(this.ioTerm) * 12);

	// Main projection calculations
	projection = $derived(this.calculateProjection());

	calculateProjection(): MortgageProjection {
		if (this.effectivePrincipal === 0) {
			return this.emptyProjection();
		}

		if (this.loanType === 'Principal & Interest') {
			return this.calculatePrincipalAndInterest();
		} else {
			return this.calculateInterestOnly();
		}
	}

	calculatePrincipalAndInterest(): MortgageProjection {
		const monthlyPayment = this.calculateMonthlyPayment(
			this.effectivePrincipal,
			this.monthlyRate,
			this.totalMonths
		);

		let remainingBalance = this.effectivePrincipal;
		let totalInterest = 0;
		const monthlyBreakdown = [];

		for (let month = 1; month <= this.totalMonths; month++) {
			const interestPayment = remainingBalance * this.monthlyRate;
			const principalPayment = monthlyPayment - interestPayment;

			totalInterest += interestPayment;
			remainingBalance -= principalPayment;

			monthlyBreakdown.push({
				month,
				principal: principalPayment,
				interest: interestPayment,
				balance: remainingBalance,
				totalInterestPaid: totalInterest
			});
		}

		return {
			monthlyRepayment: monthlyPayment,
			totalInterest,
			totalRepayment: monthlyPayment * this.totalMonths,
			remainingPrincipal: remainingBalance,
			monthlyBreakdown
		};
	}

	calculateInterestOnly(): MortgageProjection {
		const ioPayment = this.effectivePrincipal * this.monthlyRate;
		let totalInterest = 0;
		const monthlyBreakdown = [];

		// IO Period
		for (let month = 1; month <= this.ioMonths; month++) {
			totalInterest += ioPayment;
			monthlyBreakdown.push({
				month,
				principal: 0,
				interest: ioPayment,
				balance: this.effectivePrincipal,
				totalInterestPaid: totalInterest
			});
		}

		// P&I Period (if any)
		if (this.ioMonths < this.totalMonths) {
			const remainingMonths = this.totalMonths - this.ioMonths;
			const piPayment = this.calculateMonthlyPayment(
				this.effectivePrincipal,
				this.monthlyRate,
				remainingMonths
			);

			let remainingBalance = this.effectivePrincipal;

			for (let month = this.ioMonths + 1; month <= this.totalMonths; month++) {
				const interestPayment = remainingBalance * this.monthlyRate;
				const principalPayment = piPayment - interestPayment;

				totalInterest += interestPayment;
				remainingBalance -= principalPayment;

				monthlyBreakdown.push({
					month,
					principal: principalPayment,
					interest: interestPayment,
					balance: remainingBalance,
					totalInterestPaid: totalInterest
				});
			}

			return {
				monthlyRepayment: piPayment,
				totalInterest,
				totalRepayment: ioPayment * this.ioMonths + piPayment * remainingMonths,
				remainingPrincipal: remainingBalance,
				monthlyBreakdown
			};
		}

		// IO only (no P&I period)
		return {
			monthlyRepayment: ioPayment,
			totalInterest,
			totalRepayment: ioPayment * this.totalMonths,
			remainingPrincipal: this.effectivePrincipal,
			monthlyBreakdown
		};
	}

	calculateMonthlyPayment(principal: number, monthlyRate: number, months: number): number {
		return (
			(principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
			(Math.pow(1 + monthlyRate, months) - 1)
		);
	}

	emptyProjection(): MortgageProjection {
		return {
			monthlyRepayment: 0,
			totalInterest: 0,
			totalRepayment: 0,
			remainingPrincipal: 0,
			monthlyBreakdown: []
		};
	}
}

const CALCULATOR_KEY = Symbol('mortgage-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new MortgageCalculator());
}

export function getCalculatorState() {
	return getContext<MortgageCalculator>(CALCULATOR_KEY);
}

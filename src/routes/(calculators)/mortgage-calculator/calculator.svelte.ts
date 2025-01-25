import { FREQUENCIES } from '$constants/frequencies';
import { setContext, getContext } from 'svelte';

interface MortgageProjection {
	repayment: number;
	totalInterest: number;
	totalRepayment: number;
	remainingPrincipal: number;
	interestSaved: number;
	breakdown: Array<{
		period: number;
		principal: number;
		interest: number;
		balance: number;
		totalInterestPaid: number;
		interestSaved: number;
		propertyValue: number;
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
	propertyValue = $state(0);
	propertyGrowthRate = $state(0.03);
	frequency = $state<keyof typeof FREQUENCIES>('monthly');

	effectivePrincipal = $derived(Math.max(0, this.principal - this.offsetBalance));
	totalMonths = $derived(this.term * 12);
	periodsPerYear = $derived(FREQUENCIES[this.frequency].value);
	totalPeriods = $derived(this.term * this.periodsPerYear);
	periodRate = $derived(this.interestRate / this.periodsPerYear);
	ioPeriods = $derived(parseInt(this.ioTerm) * this.periodsPerYear);
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
		const baseProjection =
			this.offsetBalance > 0 ? this.calculateBaseProjection(this.principal) : null;

		const payment = this.calculatePayment(
			this.effectivePrincipal,
			this.periodRate,
			this.totalPeriods
		);

		let remainingBalance = this.effectivePrincipal;
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;

		for (let period = 1; period <= this.totalPeriods; period++) {
			const interestPayment = remainingBalance * this.periodRate;
			const principalPayment = payment - interestPayment;
			const baseInterest = baseProjection ? baseProjection.breakdown[period - 1].interest : 0;

			totalInterest += interestPayment;
			remainingBalance -= principalPayment;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: principalPayment,
				interest: interestPayment,
				balance: remainingBalance,
				totalInterestPaid: totalInterest,
				interestSaved: baseProjection ? baseInterest - interestPayment : 0,
				propertyValue: currentPropertyValue
			});
		}

		return {
			repayment: payment,
			totalInterest,
			totalRepayment: payment * this.totalPeriods,
			remainingPrincipal: remainingBalance,
			interestSaved: baseProjection ? baseProjection.totalInterest - totalInterest : 0,
			breakdown
		};
	}

	calculateInterestOnly(): MortgageProjection {
		const baseProjection =
			this.offsetBalance > 0 ? this.calculateBaseProjection(this.principal) : null;

		const ioPayment = this.effectivePrincipal * this.periodRate;
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;

		for (let period = 1; period <= this.ioPeriods; period++) {
			const baseInterest = baseProjection ? baseProjection.breakdown[period - 1].interest : 0;

			totalInterest += ioPayment;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: 0,
				interest: ioPayment,
				balance: this.effectivePrincipal,
				totalInterestPaid: totalInterest,
				interestSaved: baseProjection ? baseInterest - ioPayment : 0,
				propertyValue: currentPropertyValue
			});
		}

		if (this.ioPeriods < this.totalPeriods) {
			const remainingPeriods = this.totalPeriods - this.ioPeriods;
			const piPayment = this.calculatePayment(
				this.effectivePrincipal,
				this.periodRate,
				remainingPeriods
			);

			let remainingBalance = this.effectivePrincipal;

			for (let period = this.ioPeriods + 1; period <= this.totalPeriods; period++) {
				const interestPayment = remainingBalance * this.periodRate;
				const principalPayment = piPayment - interestPayment;
				const baseInterest = baseProjection ? baseProjection.breakdown[period - 1].interest : 0;

				totalInterest += interestPayment;
				remainingBalance -= principalPayment;
				currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

				breakdown.push({
					period,
					principal: principalPayment,
					interest: interestPayment,
					balance: remainingBalance,
					totalInterestPaid: totalInterest,
					interestSaved: baseProjection ? baseInterest - interestPayment : 0,
					propertyValue: currentPropertyValue
				});
			}

			return {
				repayment: piPayment,
				totalInterest,
				totalRepayment: ioPayment * this.ioPeriods + piPayment * remainingPeriods,
				remainingPrincipal: remainingBalance,
				interestSaved: baseProjection ? baseProjection.totalInterest - totalInterest : 0,
				breakdown
			};
		}

		return {
			repayment: ioPayment,
			totalInterest,
			totalRepayment: ioPayment * this.totalPeriods,
			remainingPrincipal: this.effectivePrincipal,
			interestSaved: baseProjection ? baseProjection.totalInterest - totalInterest : 0,
			breakdown
		};
	}

	calculateBaseProjection(principal: number): MortgageProjection {
		if (this.loanType === 'Principal & Interest') {
			return this.calculateBasePrincipalAndInterest(principal);
		} else {
			return this.calculateBaseInterestOnly(principal);
		}
	}

	calculateBasePrincipalAndInterest(principal: number): MortgageProjection {
		const payment = this.calculatePayment(principal, this.periodRate, this.totalPeriods);

		let remainingBalance = principal;
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;

		for (let period = 1; period <= this.totalPeriods; period++) {
			const interestPayment = remainingBalance * this.periodRate;
			const principalPayment = payment - interestPayment;

			totalInterest += interestPayment;
			remainingBalance -= principalPayment;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: principalPayment,
				interest: interestPayment,
				balance: remainingBalance,
				totalInterestPaid: totalInterest,
				interestSaved: 0,
				propertyValue: currentPropertyValue
			});
		}

		return {
			repayment: payment,
			totalInterest,
			totalRepayment: payment * this.totalPeriods,
			remainingPrincipal: remainingBalance,
			interestSaved: 0,
			breakdown
		};
	}

	calculateBaseInterestOnly(principal: number): MortgageProjection {
		const ioPayment = principal * this.periodRate;
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;

		for (let period = 1; period <= this.ioPeriods; period++) {
			totalInterest += ioPayment;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: 0,
				interest: ioPayment,
				balance: principal,
				totalInterestPaid: totalInterest,
				interestSaved: 0,
				propertyValue: currentPropertyValue
			});
		}

		if (this.ioPeriods < this.totalPeriods) {
			const remainingPeriods = this.totalPeriods - this.ioPeriods;
			const piPayment = this.calculatePayment(principal, this.periodRate, remainingPeriods);

			let remainingBalance = principal;

			for (let period = this.ioPeriods + 1; period <= this.totalPeriods; period++) {
				const interestPayment = remainingBalance * this.periodRate;
				const principalPayment = piPayment - interestPayment;

				totalInterest += interestPayment;
				remainingBalance -= principalPayment;
				currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

				breakdown.push({
					period,
					principal: principalPayment,
					interest: interestPayment,
					balance: remainingBalance,
					totalInterestPaid: totalInterest,
					interestSaved: 0,
					propertyValue: currentPropertyValue
				});
			}

			return {
				repayment: piPayment,
				totalInterest,
				totalRepayment: ioPayment * this.ioPeriods + piPayment * remainingPeriods,
				remainingPrincipal: remainingBalance,
				interestSaved: 0,
				breakdown
			};
		}

		return {
			repayment: ioPayment,
			totalInterest,
			totalRepayment: ioPayment * this.totalPeriods,
			remainingPrincipal: principal,
			interestSaved: 0,
			breakdown
		};
	}

	calculatePayment(principal: number, periodRate: number, periods: number): number {
		return (
			(principal * periodRate * Math.pow(1 + periodRate, periods)) /
			(Math.pow(1 + periodRate, periods) - 1)
		);
	}

	emptyProjection(): MortgageProjection {
		return {
			repayment: 0,
			totalInterest: 0,
			totalRepayment: 0,
			remainingPrincipal: 0,
			interestSaved: 0,
			breakdown: []
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

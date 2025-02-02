import { FREQUENCIES } from '$constants/frequencies';
import { setContext, getContext } from 'svelte';

interface MortgageProjection {
	repayment: number;
	ioRepayment: number;
	totalInterest: number;
	totalRepayment: number;
	remainingPrincipal: number;
	breakdown: Array<{
		period: number;
		principal: number;
		interest: number;
		balance: number;
		totalInterestPaid: number;
		propertyValue: number;
		extraRepayment: number;
	}>;
}

class MortgageCalculator {
	principal = $state(700000);
	interestRate = $state(0.06);
	loanType = $state<'Principal & Interest' | 'Interest Only'>('Principal & Interest');
	ioTerm = $state('3');
	ioRate = $state(0.05);
	term = $state(30);
	propertyValue = $state(0);
	propertyGrowthRate = $state(0.025);
	frequency = $state<keyof typeof FREQUENCIES>('monthly');
	extraRepayments = $state(0);
	totalMonths = $derived(this.term * 12);
	periodsPerYear = $derived(FREQUENCIES[this.frequency].value);
	totalPeriods = $derived(this.term * this.periodsPerYear);
	periodRate = $derived(this.interestRate / this.periodsPerYear);
	ioPeriods = $derived(parseInt(this.ioTerm) * this.periodsPerYear);
	extraPerPeriod = $derived(this.extraRepayments);
	projection = $derived(this.calculateProjection());

	calculateProjection(): MortgageProjection {
		if (this.principal === 0) {
			return this.emptyProjection();
		}

		if (this.loanType === 'Principal & Interest') {
			return this.calculatePrincipalAndInterest();
		} else {
			return this.calculateInterestOnly();
		}
	}

	calculatePrincipalAndInterest(): MortgageProjection {
		const payment = this.calculatePayment(this.principal, this.periodRate, this.totalPeriods);

		let remainingBalance = this.principal;
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;

		for (let period = 1; period <= this.totalPeriods; period++) {
			// First apply any extra repayments to reduce principal
			const extraRepayment = remainingBalance > 0 ? this.extraPerPeriod : 0;
			remainingBalance = Math.max(0, remainingBalance - extraRepayment);

			// Then calculate interest on remaining balance
			const interestPayment = remainingBalance * this.periodRate;
			const principalPayment = Math.min(payment - interestPayment, remainingBalance);

			totalInterest += interestPayment;
			remainingBalance = Math.max(0, remainingBalance - principalPayment);
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: principalPayment,
				interest: interestPayment,
				balance: remainingBalance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (remainingBalance === 0) {
				break;
			}
		}

		const actualTotalPeriods = breakdown.length;
		const totalRepayment =
			payment * actualTotalPeriods +
			breakdown.reduce((sum, period) => sum + period.extraRepayment, 0);

		return {
			repayment: payment,
			ioRepayment: 0,
			totalInterest,
			totalRepayment,
			remainingPrincipal: remainingBalance,
			breakdown
		};
	}

	calculateInterestOnly(): MortgageProjection {
		const ioPayment = this.principal * (this.ioRate / this.periodsPerYear);
		let totalInterest = 0;
		const breakdown = [];
		let currentPropertyValue = this.propertyValue;
		let remainingBalance = this.principal;

		// IO Period
		for (let period = 1; period <= this.ioPeriods; period++) {
			// First apply extra repayments to reduce principal
			const extraRepayment = remainingBalance > 0 ? this.extraPerPeriod : 0;
			remainingBalance = Math.max(0, remainingBalance - extraRepayment);

			// Then calculate interest on remaining balance
			const interestPayment = remainingBalance * (this.ioRate / this.periodsPerYear);

			totalInterest += interestPayment;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: 0,
				interest: interestPayment,
				balance: remainingBalance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (remainingBalance === 0) {
				break;
			}
		}

		// P&I Period (if applicable)
		if (remainingBalance > 0 && this.ioPeriods < this.totalPeriods) {
			const remainingPeriods = this.totalPeriods - this.ioPeriods;
			const piPayment = this.calculatePayment(remainingBalance, this.periodRate, remainingPeriods);

			for (let period = this.ioPeriods + 1; period <= this.totalPeriods; period++) {
				// First apply extra repayments
				const extraRepayment = remainingBalance > 0 ? this.extraPerPeriod : 0;
				remainingBalance = Math.max(0, remainingBalance - extraRepayment);

				// Then calculate interest and principal payments
				const interestPayment = remainingBalance * this.periodRate;
				const principalPayment = Math.min(piPayment - interestPayment, remainingBalance);

				totalInterest += interestPayment;
				remainingBalance = Math.max(0, remainingBalance - principalPayment);
				currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

				breakdown.push({
					period,
					principal: principalPayment,
					interest: interestPayment,
					balance: remainingBalance,
					totalInterestPaid: totalInterest,
					propertyValue: currentPropertyValue,
					extraRepayment
				});

				if (remainingBalance === 0) {
					break;
				}
			}

			const actualPIPeriods = breakdown.length - this.ioPeriods;
			const totalRepayment =
				ioPayment * this.ioPeriods +
				piPayment * actualPIPeriods +
				breakdown.reduce((sum, period) => sum + period.extraRepayment, 0);

			return {
				repayment: piPayment,
				ioRepayment: ioPayment,
				totalInterest,
				totalRepayment,
				remainingPrincipal: remainingBalance,
				breakdown
			};
		}

		const totalRepayment =
			ioPayment * breakdown.length +
			breakdown.reduce((sum, period) => sum + period.extraRepayment, 0);

		return {
			repayment: 0,
			ioRepayment: ioPayment,
			totalInterest,
			totalRepayment,
			remainingPrincipal: remainingBalance,
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
			ioRepayment: 0,
			totalInterest: 0,
			totalRepayment: 0,
			remainingPrincipal: 0,
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

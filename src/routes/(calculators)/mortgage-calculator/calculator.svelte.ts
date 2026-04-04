import { FREQUENCIES } from '$constants/frequencies';
import { setContext, getContext } from 'svelte';
import { formatAsCurrency } from '$utils/formatters';

export type LoanType = 'Principal & Interest' | 'Interest Only' | 'Variable';

export interface BreakdownPeriod {
	period: number;
	principal: number;
	interest: number;
	balance: number;
	totalInterestPaid: number;
	propertyValue: number;
	extraRepayment: number;
}

export interface MortgageProjection {
	repayment: number;
	ioRepayment: number;
	totalInterest: number;
	totalRepayment: number;
	remainingPrincipal: number;
	breakdown: BreakdownPeriod[];
}

const REPAYMENT_FREQUENCIES = ['weekly', 'fortnightly', 'monthly'] as const;
type RepaymentFrequency = (typeof REPAYMENT_FREQUENCIES)[number];

class MortgageCalculatorState {
	principal = $state(700_000);
	interestRate = $state(0.06);
	loanType = $state<LoanType>('Principal & Interest');
	term = $state(30);
	frequency = $state<RepaymentFrequency>('monthly');
	extraRepayments = $state(0);

	// Interest Only
	ioRate = $state(0.055);
	ioTerm = $state(3);

	// Variable
	variableRate = $state(0.08);
	fixedTerm = $state(3);

	// Property
	propertyValue = $state(0);
	propertyGrowthRate = $state(0.03);

	periodsPerYear = $derived(FREQUENCIES[this.frequency].value);
	totalPeriods = $derived(this.term * this.periodsPerYear);
	periodRate = $derived(this.interestRate / this.periodsPerYear);
	ioPeriods = $derived(this.ioTerm * this.periodsPerYear);
	fixedPeriods = $derived(this.fixedTerm * this.periodsPerYear);

	projection = $derived.by(() => {
		if (this.principal <= 0) return this.emptyProjection();
		if (this.loanType === 'Interest Only') return this.calculateInterestOnly();
		if (this.loanType === 'Variable') return this.calculateVariable();
		return this.calculatePrincipalAndInterest();
	});

	interestSaved = $derived.by(() => {
		if (this.extraRepayments <= 0) return 0;
		const withoutExtra = this.calculatePrincipalAndInterest(0);
		return withoutExtra.totalInterest - this.projection.totalInterest;
	});

	private calculatePayment(principal: number, periodRate: number, periods: number): number {
		if (periodRate === 0) return principal / periods;
		return (
			(principal * periodRate * Math.pow(1 + periodRate, periods)) /
			(Math.pow(1 + periodRate, periods) - 1)
		);
	}

	private calculatePrincipalAndInterest(overrideExtra?: number): MortgageProjection {
		const extra = overrideExtra !== undefined ? overrideExtra : this.extraRepayments;
		const payment = this.calculatePayment(this.principal, this.periodRate, this.totalPeriods);
		let balance = this.principal;
		let totalInterest = 0;
		let currentPropertyValue = this.propertyValue;
		const breakdown: BreakdownPeriod[] = [];

		for (let period = 1; period <= this.totalPeriods; period++) {
			const extraRepayment = balance > 0 ? extra : 0;
			balance = Math.max(0, balance - extraRepayment);
			const interest = balance * this.periodRate;
			const principal = Math.min(payment - interest, balance);
			totalInterest += interest;
			balance = Math.max(0, balance - principal);
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal,
				interest,
				balance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (balance === 0) break;
		}

		const totalRepayment =
			payment * breakdown.length +
			breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

		return {
			repayment: payment,
			ioRepayment: 0,
			totalInterest,
			totalRepayment,
			remainingPrincipal: balance,
			breakdown
		};
	}

	private calculateInterestOnly(): MortgageProjection {
		const ioPayment = this.principal * (this.ioRate / this.periodsPerYear);
		let balance = this.principal;
		let totalInterest = 0;
		let currentPropertyValue = this.propertyValue;
		const breakdown: BreakdownPeriod[] = [];

		for (let period = 1; period <= this.ioPeriods; period++) {
			const extraRepayment = balance > 0 ? this.extraRepayments : 0;
			balance = Math.max(0, balance - extraRepayment);
			const interest = balance * (this.ioRate / this.periodsPerYear);
			totalInterest += interest;
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal: 0,
				interest,
				balance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (balance === 0) break;
		}

		// P&I phase after IO period
		if (balance > 0 && this.ioPeriods < this.totalPeriods) {
			const remainingPeriods = this.totalPeriods - this.ioPeriods;
			const piPayment = this.calculatePayment(balance, this.periodRate, remainingPeriods);

			for (let period = this.ioPeriods + 1; period <= this.totalPeriods; period++) {
				const extraRepayment = balance > 0 ? this.extraRepayments : 0;
				balance = Math.max(0, balance - extraRepayment);
				const interest = balance * this.periodRate;
				const principal = Math.min(piPayment - interest, balance);
				totalInterest += interest;
				balance = Math.max(0, balance - principal);
				currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

				breakdown.push({
					period,
					principal,
					interest,
					balance,
					totalInterestPaid: totalInterest,
					propertyValue: currentPropertyValue,
					extraRepayment
				});

				if (balance === 0) break;
			}

			const piPeriods = breakdown.length - this.ioPeriods;
			const totalRepayment =
				ioPayment * this.ioPeriods +
				this.calculatePayment(this.principal, this.periodRate, this.totalPeriods - this.ioPeriods) *
					piPeriods +
				breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

			return {
				repayment: this.calculatePayment(
					this.principal,
					this.periodRate,
					this.totalPeriods - this.ioPeriods
				),
				ioRepayment: ioPayment,
				totalInterest,
				totalRepayment,
				remainingPrincipal: balance,
				breakdown
			};
		}

		const totalRepayment =
			ioPayment * breakdown.length +
			breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

		return {
			repayment: 0,
			ioRepayment: ioPayment,
			totalInterest,
			totalRepayment,
			remainingPrincipal: balance,
			breakdown
		};
	}

	private calculateVariable(): MortgageProjection {
		let balance = this.principal;
		let totalInterest = 0;
		let currentPropertyValue = this.propertyValue;
		const breakdown: BreakdownPeriod[] = [];

		// Fixed period
		const fixedPeriodRate = this.interestRate / this.periodsPerYear;
		const fixedPayment = this.calculatePayment(this.principal, fixedPeriodRate, this.totalPeriods);

		for (let period = 1; period <= this.fixedPeriods && period <= this.totalPeriods; period++) {
			const extraRepayment = balance > 0 ? this.extraRepayments : 0;
			balance = Math.max(0, balance - extraRepayment);
			const interest = balance * fixedPeriodRate;
			const principal = Math.min(fixedPayment - interest, balance);
			totalInterest += interest;
			balance = Math.max(0, balance - principal);
			currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

			breakdown.push({
				period,
				principal,
				interest,
				balance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (balance === 0) break;
		}

		// Variable period
		if (balance > 0 && this.fixedPeriods < this.totalPeriods) {
			const remainingPeriods = this.totalPeriods - this.fixedPeriods;
			const variablePeriodRate = this.variableRate / this.periodsPerYear;
			const variablePayment = this.calculatePayment(balance, variablePeriodRate, remainingPeriods);

			for (let period = this.fixedPeriods + 1; period <= this.totalPeriods; period++) {
				const extraRepayment = balance > 0 ? this.extraRepayments : 0;
				balance = Math.max(0, balance - extraRepayment);
				const interest = balance * variablePeriodRate;
				const principal = Math.min(variablePayment - interest, balance);
				totalInterest += interest;
				balance = Math.max(0, balance - principal);
				currentPropertyValue *= 1 + this.propertyGrowthRate / this.periodsPerYear;

				breakdown.push({
					period,
					principal,
					interest,
					balance,
					totalInterestPaid: totalInterest,
					propertyValue: currentPropertyValue,
					extraRepayment
				});

				if (balance === 0) break;
			}
		}

		const totalRepayment =
			fixedPayment * Math.min(this.fixedPeriods, breakdown.length) +
			breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

		return {
			repayment: fixedPayment,
			ioRepayment: 0,
			totalInterest,
			totalRepayment,
			remainingPrincipal: balance,
			breakdown
		};
	}

	private emptyProjection(): MortgageProjection {
		return {
			repayment: 0,
			ioRepayment: 0,
			totalInterest: 0,
			totalRepayment: 0,
			remainingPrincipal: 0,
			breakdown: []
		};
	}

	getScheduleData() {
		const includeProperty = this.propertyValue > 0;
		const columns = [
			'Period',
			'Principal',
			'Interest',
			'Balance',
			'Total Interest',
			...(includeProperty ? ['Property Value'] : []),
			'Extra Repayment'
		];

		return {
			columns,
			rows: this.projection.breakdown.map((p) => [
				p.period,
				formatAsCurrency(p.principal),
				formatAsCurrency(p.interest),
				formatAsCurrency(p.balance),
				formatAsCurrency(p.totalInterestPaid),
				...(includeProperty ? [formatAsCurrency(p.propertyValue)] : []),
				formatAsCurrency(p.extraRepayment)
			])
		};
	}
}

const CALCULATOR_KEY = Symbol('mortgage-calculator');

export function setCalculatorState() {
	return setContext(CALCULATOR_KEY, new MortgageCalculatorState());
}

export function getCalculatorState() {
	return getContext<MortgageCalculatorState>(CALCULATOR_KEY);
}

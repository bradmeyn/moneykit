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

export function calculatePayment(principal: number, periodRate: number, periods: number): number {
	if (periodRate === 0) return principal / periods;
	return (
		(principal * periodRate * Math.pow(1 + periodRate, periods)) /
		(Math.pow(1 + periodRate, periods) - 1)
	);
}

export function calculatePrincipalAndInterest(
	principal: number,
	periodRate: number,
	totalPeriods: number,
	periodsPerYear: number,
	extraRepayments: number,
	propertyValue: number,
	propertyGrowthRate: number
): MortgageProjection {
	const payment = calculatePayment(principal, periodRate, totalPeriods);
	let balance = principal;
	let totalInterest = 0;
	let currentPropertyValue = propertyValue;
	const breakdown: BreakdownPeriod[] = [];

	for (let period = 1; period <= totalPeriods; period++) {
		const extraRepayment = balance > 0 ? extraRepayments : 0;
		balance = Math.max(0, balance - extraRepayment);
		const interest = balance * periodRate;
		const principalPaid = Math.min(payment - interest, balance);
		totalInterest += interest;
		balance = Math.max(0, balance - principalPaid);
		currentPropertyValue *= 1 + propertyGrowthRate / periodsPerYear;

		breakdown.push({
			period,
			principal: principalPaid,
			interest,
			balance,
			totalInterestPaid: totalInterest,
			propertyValue: currentPropertyValue,
			extraRepayment
		});

		if (balance === 0) break;
	}

	const totalRepayment =
		payment * breakdown.length + breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

	return {
		repayment: payment,
		ioRepayment: 0,
		totalInterest,
		totalRepayment,
		remainingPrincipal: balance,
		breakdown
	};
}

export function calculateInterestOnly(
	principal: number,
	ioRate: number,
	ioPeriods: number,
	totalPeriods: number,
	periodsPerYear: number,
	periodRate: number,
	extraRepayments: number,
	propertyValue: number,
	propertyGrowthRate: number
): MortgageProjection {
	const ioPayment = principal * (ioRate / periodsPerYear);
	let balance = principal;
	let totalInterest = 0;
	let currentPropertyValue = propertyValue;
	const breakdown: BreakdownPeriod[] = [];

	for (let period = 1; period <= ioPeriods; period++) {
		const extraRepayment = balance > 0 ? extraRepayments : 0;
		balance = Math.max(0, balance - extraRepayment);
		const interest = balance * (ioRate / periodsPerYear);
		totalInterest += interest;
		currentPropertyValue *= 1 + propertyGrowthRate / periodsPerYear;

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
	if (balance > 0 && ioPeriods < totalPeriods) {
		const remainingPeriods = totalPeriods - ioPeriods;
		const piPayment = calculatePayment(balance, periodRate, remainingPeriods);

		for (let period = ioPeriods + 1; period <= totalPeriods; period++) {
			const extraRepayment = balance > 0 ? extraRepayments : 0;
			balance = Math.max(0, balance - extraRepayment);
			const interest = balance * periodRate;
			const principalPaid = Math.min(piPayment - interest, balance);
			totalInterest += interest;
			balance = Math.max(0, balance - principalPaid);
			currentPropertyValue *= 1 + propertyGrowthRate / periodsPerYear;

			breakdown.push({
				period,
				principal: principalPaid,
				interest,
				balance,
				totalInterestPaid: totalInterest,
				propertyValue: currentPropertyValue,
				extraRepayment
			});

			if (balance === 0) break;
		}

		const piPeriods = breakdown.length - ioPeriods;
		const totalRepayment =
			ioPayment * ioPeriods +
			calculatePayment(principal, periodRate, totalPeriods - ioPeriods) * piPeriods +
			breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

		return {
			repayment: calculatePayment(principal, periodRate, totalPeriods - ioPeriods),
			ioRepayment: ioPayment,
			totalInterest,
			totalRepayment,
			remainingPrincipal: balance,
			breakdown
		};
	}

	const totalRepayment =
		ioPayment * breakdown.length + breakdown.reduce((sum, p) => sum + p.extraRepayment, 0);

	return {
		repayment: 0,
		ioRepayment: ioPayment,
		totalInterest,
		totalRepayment,
		remainingPrincipal: balance,
		breakdown
	};
}

export function calculateVariable(
	principal: number,
	interestRate: number,
	variableRate: number,
	totalPeriods: number,
	periodsPerYear: number,
	fixedPeriods: number,
	extraRepayments: number,
	propertyValue: number,
	propertyGrowthRate: number
): MortgageProjection {
	let balance = principal;
	let totalInterest = 0;
	let currentPropertyValue = propertyValue;
	const breakdown: BreakdownPeriod[] = [];

	const fixedPeriodRate = interestRate / periodsPerYear;
	const fixedPayment = calculatePayment(principal, fixedPeriodRate, totalPeriods);

	for (let period = 1; period <= fixedPeriods && period <= totalPeriods; period++) {
		const extraRepayment = balance > 0 ? extraRepayments : 0;
		balance = Math.max(0, balance - extraRepayment);
		const interest = balance * fixedPeriodRate;
		const principalPaid = Math.min(fixedPayment - interest, balance);
		totalInterest += interest;
		balance = Math.max(0, balance - principalPaid);
		currentPropertyValue *= 1 + propertyGrowthRate / periodsPerYear;

		breakdown.push({
			period,
			principal: principalPaid,
			interest,
			balance,
			totalInterestPaid: totalInterest,
			propertyValue: currentPropertyValue,
			extraRepayment
		});

		if (balance === 0) break;
	}

	if (balance > 0 && fixedPeriods < totalPeriods) {
		const remainingPeriods = totalPeriods - fixedPeriods;
		const variablePeriodRate = variableRate / periodsPerYear;
		const variablePayment = calculatePayment(balance, variablePeriodRate, remainingPeriods);

		for (let period = fixedPeriods + 1; period <= totalPeriods; period++) {
			const extraRepayment = balance > 0 ? extraRepayments : 0;
			balance = Math.max(0, balance - extraRepayment);
			const interest = balance * variablePeriodRate;
			const principalPaid = Math.min(variablePayment - interest, balance);
			totalInterest += interest;
			balance = Math.max(0, balance - principalPaid);
			currentPropertyValue *= 1 + propertyGrowthRate / periodsPerYear;

			breakdown.push({
				period,
				principal: principalPaid,
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
		fixedPayment * Math.min(fixedPeriods, breakdown.length) +
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

export function buildScheduleData(breakdown: BreakdownPeriod[], includeProperty: boolean) {
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
		rows: breakdown.map((p) => [
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

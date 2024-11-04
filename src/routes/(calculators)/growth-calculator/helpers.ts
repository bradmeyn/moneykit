export type CompoundInterestResult = {
	totalValue: number;
	totalInterest: number;
	totalContributions: number;
	annualData: AnnualData[];
};

export type AnnualData = {
	year: number;
	startingValue: number;
	yearlyInterest: number;
	totalInterest: number;
	yearlyContribution: number;
	totalContributions: number;
	endingValue: number;
};

export function calculateCompoundInterest(
	principal: number = 0,
	interestRate: number = 0,
	years: number = 0,
	contributionAmount: number = 0,
	contributionFrequency: number = 0
): CompoundInterestResult {
	if (
		principal <= 0 ||
		interestRate <= 0 ||
		years <= 0 ||
		contributionAmount < 0 ||
		contributionFrequency < 0
	) {
		return {
			totalValue: 0,
			totalInterest: 0,
			totalContributions: 0,
			annualData: []
		};
	}
	let totalValue = principal;
	let totalInterest = 0;
	let totalContributions = 0;

	const annualData = [];

	for (let i = 0; i < years; i++) {
		const startingValue = parseFloat(totalValue.toFixed(2));
		const yearlyInterest = totalValue * interestRate;
		totalInterest += yearlyInterest;
		const yearlyContribution = contributionAmount * contributionFrequency;
		totalContributions += yearlyContribution;
		totalValue += yearlyInterest + yearlyContribution;

		annualData.push({
			year: i + 1,
			startingValue,
			yearlyInterest: parseFloat(yearlyInterest.toFixed(2)),
			totalInterest: parseFloat(totalInterest.toFixed(2)),
			yearlyContribution: parseFloat(yearlyContribution.toFixed(2)),
			totalContributions: parseFloat(totalContributions.toFixed(2)),
			endingValue: parseFloat(totalValue.toFixed(2))
		});
	}

	return {
		totalValue,
		totalInterest,
		totalContributions,
		annualData
	};
}

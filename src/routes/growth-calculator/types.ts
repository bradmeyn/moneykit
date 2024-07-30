export type Scenario = {
	id: number;
	principal: number;
	contributionAmount: number;
	interestRate: number;
	contributionFrequency: number;
	years: number;
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

// Define the type for the result of calculateCompoundInterest
export type CompoundInterestResult = {
	totalValue: number;
	totalInterest: number;
	totalContributions: number;
	annualData: AnnualData[];
};

// Define the type for a single result
export type Result = {
	id: number;
	totalValue: number;
	totalInterest: number;
	totalContributions: number;
	annualData: AnnualData[];
};

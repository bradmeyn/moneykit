export type Scenario = {
	id: number;
	startingAmount: number;
	drawdown: number;
	interestRate: number;
};

export type AnnualData = {
	year: number;
	startingBalance: number;
	interestEarned: number;
	withdrawal: number;
	endingBalance: number;
};

// Define the type for the result of calculateCompoundInterest
export type CompoundInterestResult = {
	totalValue: number;
	totalInterest: number;
	totalDrawdown: number;
	annualData: AnnualData[];
};

export interface DrawdownResult {
	yearsLasted: number;
	remainingBalance: number;
	totalInterest: number;
	totalWithdrawn: number;
	annualData: AnnualData[];
}

// Define the type for a single result
export interface Result extends DrawdownResult {
	id: number;
}

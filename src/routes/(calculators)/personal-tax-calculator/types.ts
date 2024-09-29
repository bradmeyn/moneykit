export type Scenario = {
	id: number;
	income: number;
	deductions: number;
	hasInsurance: boolean;
	hasHelpDebt: boolean;
};

export type Result = {
	id: number;
	taxableIncome: number;
	incomeTax: number;
	lowIncomeOffset: number;
	helpRepayment: number;
	medicareLevy: number;
	medicareLevySurcharge: number;
	totalTax: number;
};

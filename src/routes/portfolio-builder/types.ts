// Define a separate type for AssetAllocation
export type AssetAllocation = {
	ausEquities: number;
	intEquities: number;
	ausProperty: number;
	intProperty: number;
	ausBonds: number;
	intBonds: number;
	cash: number;
};

// Now, Investment uses the AssetAllocation type
export type Investment = {
	name: string;
	code: string;
	cost: number;
	assetAllocation: AssetAllocation;
};

export type Holding = {
	investment: Investment;
	allocation: number;
	value: number;
	cost: number;
};

export interface TaxBracket {
	min: number;
	max: number;
	rate: number;
}

export interface OffsetBracket {
	min: number;
	max: number;
	reduction: number;
	amount: number;
}

export interface IncomeTax {
	brackets: TaxBracket[];
	offsets: {
		lowIncome: {
			brackets: OffsetBracket[];
		};
	};
}

export interface MedicareLevy {
	rate: number;
	offsets: {
		seniors: Offset;
		lowIncome: Offset;
	};
}

export interface TaxRateConfiguration {
	financialYear: number;
	name: string;
	incomeTax: IncomeTax;
	medicareLevy: MedicareLevy;
	medicareLevySurcharge: TaxBracket[];
}

// Adjusting the Offset type to reflect the structure used in medicareLevy
export interface Offset {
	min: number;
	max: number;
	offset: number;
}

export interface TaxRateConfiguration {
	financialYear: number;
	name: string;
	incomeTax: IncomeTax;
	medicareLevy: MedicareLevy;
	medicareLevySurcharge: TaxBracket[];
}

export type PersonalTaxScenario = {
	income: number;
	deductions: number;
	hasInsurance: boolean;
	taxRates: TaxRateConfiguration;
};

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

export type Investment = {
	name: string;
	code: string;
	cost: number;
	assetAllocation: AssetAllocation;
};

export type Holding = {
	investment: Investment;
	weighting: number;
	value: number;
	cost: number;
};

export type Scenario = {
	id: number;
	value: number;
	holdings: {
		investment: Investment;
		weighting: number;
	}[];
};

export type Result = {
	id: number;
	holdings: Holding[];
	assetAllocation: {
		name: string;
		key: string;
		value: number;
	}[];
	totalWeighting: number;
	totalCost: number;
	totalCostPercentage: number;
};

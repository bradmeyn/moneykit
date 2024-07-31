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

export type Portfolio = {
	id: number;
	value: number;
	holdings: {
		investment: Investment;
		weighting: number;
	}[];
};

export type PortfolioDetails = {
	id: number;
	value: number;
	holdings: Holding[];
	assetAllocation: AssetAllocation;
};

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

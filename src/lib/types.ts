export type Investment = {
	name: string;
	code: string;
	cost: number;
	assetAllocation: {
		ausEquities: number;
		intEquities: number;
		ausProperty: number;
		intProperty: number;
		ausBonds: number;
		intBonds: number;
		cash: number;
	};
};

export type Holding = {
	investment: Investment;
	allocation: number;
	value: number;
};

import { type Investment } from './types';

export const INVESTMENTS: Investment[] = [
	{
		name: 'Vanguard Australian Shares Index ETF',
		code: 'VAS',
		cost: 0.0007,
		assetAllocation: {
			ausEquities: 1,
			intEquities: 0,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard International Shares Index ETF',
		code: 'VGS',
		cost: 0.0018,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard Australian Property Securities Index ETF',
		code: 'VAP',
		cost: 0.0023,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 1,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},

	{
		name: 'Vanguard Australian Fixed Interest Index ETF',
		code: 'VAF',
		cost: 0.002,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 1,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard International Fixed Interest Index ETF',
		code: 'VIF',
		cost: 0.002,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 1,
			cash: 0
		}
	},
	{
		name: 'Vanguard MSCI International Small Companies Index ETF',
		code: 'VISM',
		cost: 0.0032,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard FTSE Emerging Markets Shares ETF',
		code: 'VGE',
		cost: 0.0048,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard FTSE Asia ex Japan Shares Index ETF',
		code: 'VAE',
		cost: 0.004,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	}
];

export const UNALLOCATED_INVESTMENT: Investment = {
	name: 'Unallocated Cash',
	code: 'CASH',
	cost: 0.0,
	assetAllocation: {
		ausEquities: 0,
		intEquities: 0,
		ausProperty: 0,
		intProperty: 0,
		ausBonds: 0,
		intBonds: 0,
		cash: 1
	}
};


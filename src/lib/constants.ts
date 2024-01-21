import type { Investment } from './types';

export type FrequencyOption = {
	name: string;
	value: number;
};

export const FREQUENCY_OPTIONS = [
	{ name: 'Weekly', value: 52 },
	{ name: 'Fortnightly', value: 26 },
	{ name: 'Monthly', value: 12 },
	{ name: 'Quarterly', value: 4 },
	{ name: 'Half Yearly', value: 2 },
	{ name: 'Yearly', value: 1 }
];

export const FINANCIAL_YEARS = [
	{ name: '2022-23', value: 2023 },
	{ name: '2023-24', value: 2024 }
];

export const INCOME_TAX_RATES = [
	{
		financialYear: 2023,
		thresholds: [
			{ min: 0, max: 18200, rate: 0 },
			{ min: 18201, max: 45000, rate: 0.19 },
			{ min: 45001, max: 120000, rate: 0.325 },
			{ min: 120001, max: 180000, rate: 0.37 },
			{ min: 180001, max: Infinity, rate: 0.45 }
		]
	}
];

export const INVESTMENTS: Investment[] = [
	{
		name: 'Vanguard Australian Shares Index ETF',
		code: 'VAS',
		cost: 0.07,
		assetAllocation: {
			ausEquities: 100,
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
		cost: 0.18,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 100,
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
		cost: 0.23,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 100,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	},

	{
		name: 'Vanguard Australian Fixed Interest Index ETF',
		code: 'VAF',
		cost: 0.2,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 100,
			intBonds: 0,
			cash: 0
		}
	},
	{
		name: 'Vanguard International Fixed Interest Index ETF',
		code: 'VIF',
		cost: 0.2,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 100,
			cash: 0
		}
	},
	{
		name: 'Vanguard MSCI International Small Companies Index ETF',
		code: 'VISM',
		cost: 0.32,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 100,
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
		cost: 0.48,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 100,
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
		cost: 0.4,
		assetAllocation: {
			ausEquities: 0,
			intEquities: 100,
			ausProperty: 0,
			intProperty: 0,
			ausBonds: 0,
			intBonds: 0,
			cash: 0
		}
	}
];

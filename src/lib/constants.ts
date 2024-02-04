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

export const INCOME_TAX_RATES = [
	{
		financialYear: 2023,
		name: '2022-23',
		incomeTax: {
			brackets: [
				{ min: 0, max: 18200, rate: 0 },
				{ min: 18201, max: 45000, rate: 0.19 },
				{ min: 45001, max: 120000, rate: 0.325 },
				{ min: 120001, max: 180000, rate: 0.37 },
				{ min: 180001, max: Infinity, rate: 0.45 }
			],
			offsets: {
				lowIncome: {
					brackets: [
						{ min: 0, max: 37500, reduction: 0, amount: 700 },
						{ min: 37501, max: 45000, reduction: 0.05, amount: 700 },
						{ min: 45001, max: 66667, reduction: 0.0125, amount: 325 }
					]
				}
			}
		},
		medicareLevy: {
			rate: 0.02,
			offsets: {
				seniors: {
					min: 38365,
					max: 47956,
					offset: 0.1
				},
				lowIncome: {
					min: 24276,
					max: 30345,
					offset: 0.105
				}
			}
		},
		medicareLevySurcharge: [
			{ min: 0, max: 90000, rate: 0 },
			{ min: 90001, max: 105000, rate: 0.01 },
			{ min: 105001, max: 140000, rate: 0.0125 },
			{ min: 140001, max: Infinity, rate: 0.015 }
		]
	},
	{
		financialYear: 2024,
		name: '2023-24',
		incomeTax: {
			brackets: [
				{ min: 0, max: 18200, rate: 0 },
				{ min: 18201, max: 45000, rate: 0.19 },
				{ min: 45001, max: 120000, rate: 0.325 },
				{ min: 120001, max: 180000, rate: 0.37 },
				{ min: 180001, max: Infinity, rate: 0.45 }
			],
			offsets: {
				lowIncome: {
					brackets: [
						{ min: 0, max: 37500, reduction: 0, amount: 700 },
						{ min: 37501, max: 45000, reduction: 0.05, amount: 700 },
						{ min: 45001, max: 66667, reduction: 0.0125, amount: 325 }
					]
				}
			}
		},
		medicareLevy: {
			rate: 0.02,
			offsets: {
				seniors: {
					min: 38365,
					max: 47956,
					offset: 0.1
				},
				lowIncome: {
					min: 24276,
					max: 30345,
					offset: 0.105
				}
			}
		},
		medicareLevySurcharge: [
			{ min: 0, max: 93000, rate: 0 },
			{ min: 93001, max: 108000, rate: 0.01 },
			{ min: 108001, max: 144000, rate: 0.0125 },
			{ min: 144001, max: Infinity, rate: 0.015 }
		]
	}
];

export const TAX_YEARS = INCOME_TAX_RATES.map((taxYear) => {
	return {
		name: taxYear.name,
		value: taxYear.financialYear
	};
});

export const CHART_COLOURS = [
	'rgb(2 132 199)', // tw sky-600
	'rgb(219 39 119)', // tw pink-600
	'rgb(202 138 4)', // tw yellow-600
	'rgb(22 163 74)', // tw green-600
	'rgb(79 70 229)', // tw indigo-600
	'rgb(190 18 60)', // tw rose-600
	'rgb(13 148 136)' // tw teal-600
];

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

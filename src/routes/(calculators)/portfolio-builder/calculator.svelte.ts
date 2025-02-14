import { setContext, getContext } from 'svelte';

// Make the asset allocation values numbers instead of strings for calculations
type AssetAllocation = {
	ausEquities: number;
	intEquities: number;
	ausFixedInterest: number;
	intFixedInterest: number;
	cash: number;
	alternatives: number;
};

export type Investment = {
	code: string;
	name: string;
	assetAllocation: AssetAllocation;
};

export type PortfolioHolding = {
	investment: Investment;
	value: number;
	weight: number;
};

class Portfolio {
	portfolioValue = $state(2000000);
	investments = $state<PortfolioHolding[]>(defaultPortfolio);

	addInvestment = (investment: PortfolioHolding) => {
		this.investments = [
			...this.investments.filter((i) => i.investment.code !== 'CASH'),
			investment
		];
	};

	updateWeight = (code: string, newWeight: number) => {
		this.investments = this.investments.map((item) => {
			if (item.investment.code === code) {
				return {
					...item,
					weight: newWeight,
					value: this.portfolioValue * newWeight
				};
			}
			// if (item.investment.code === 'CASH') {
			// 	const activeTotal = this.investments
			// 		.filter((i) => i.investment.code !== 'CASH')
			// 		.reduce((sum, h) => sum + (h.investment.code === code ? newWeight : h.weight), 0);

			// 	const cashWeight = Math.max(0, 1 - activeTotal);
			// 	return {
			// 		...item,
			// 		weight: cashWeight,
			// 		value: this.portfolioValue * cashWeight
			// 	};
			// }
			return item;
		});
	};

	removeInvestment = (code: string) => {
		this.investments = this.investments.filter((i) => i.investment.code !== code);
	};

	private calculateWeights() {
		return this.investments.map((holding) => {
			const adjustedValue = holding.value / this.portfolioValue;
			return { ...holding, weight: adjustedValue };
		});
		// .toSorted((a, b) => {
		// 	// Always put CASH at the end
		// 	if (a.investment.code === 'CASH') return 1;
		// 	if (b.investment.code === 'CASH') return -1;
		// 	return b.weight - a.weight;
		// });
	}

	private calculateTotal() {
		return this.portfolio.reduce((acc, holding) => acc + holding.value, 0);
	}

	private calculateTotalWeight() {
		return this.investments.reduce((acc, holding) => acc + holding.weight, 0);
	}

	portfolio: PortfolioHolding[] = $derived(this.calculateWeights());
	total = $derived(this.calculateTotal());
	totalWeight = $derived(this.calculateTotalWeight());
}

const PORTFOLIO_KEY = Symbol('portfolio');

export function setPortfolioState() {
	return setContext(PORTFOLIO_KEY, new Portfolio());
}

export function getPortfolioState() {
	return getContext<Portfolio>(PORTFOLIO_KEY);
}

const cashAccount: PortfolioHolding = {
	investment: {
		code: 'CASH',
		name: 'Cash Account',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 1,
			alternatives: 0
		}
	},
	value: 0,
	weight: 0
};

const defaultPortfolio: PortfolioHolding[] = [
	{
		investment: {
			code: 'VAS',
			name: 'Vanguard Australian Shares Index ETF',
			assetAllocation: {
				ausEquities: 1,
				intEquities: 0,
				ausFixedInterest: 0,
				intFixedInterest: 0,
				cash: 0,
				alternatives: 0
			}
		},
		value: 500000,
		weight: 0.25
	},
	{
		investment: {
			code: 'VGS',
			name: 'Vanguard MSCI Index International Shares ETF',
			assetAllocation: {
				ausEquities: 0,
				intEquities: 1,
				ausFixedInterest: 0,
				intFixedInterest: 0,
				cash: 0,
				alternatives: 0
			}
		},
		value: 700000,
		weight: 0.35
	},
	{
		investment: {
			code: 'VAF',
			name: 'Vanguard Australian Fixed Interest Index ETF',
			assetAllocation: {
				ausEquities: 0,
				intEquities: 0,
				ausFixedInterest: 1,
				intFixedInterest: 0,
				cash: 0,
				alternatives: 0
			}
		},
		value: 300000,
		weight: 0.15
	},
	{
		investment: {
			code: 'VGAD',
			name: 'Vanguard MSCI Index International Shares (Hedged) ETF',
			assetAllocation: {
				ausEquities: 0,
				intEquities: 1,
				ausFixedInterest: 0,
				intFixedInterest: 0,
				cash: 0,
				alternatives: 0
			}
		},
		value: 300000,
		weight: 0.15
	},
	{
		investment: {
			code: 'VGB',
			name: 'Vanguard Australian Government Bond Index ETF',
			assetAllocation: {
				ausEquities: 0,
				intEquities: 0,
				ausFixedInterest: 0.95,
				intFixedInterest: 0,
				cash: 0.05,
				alternatives: 0
			}
		},
		value: 200000,
		weight: 0.1
	},
	cashAccount
];

export const investmentList: Investment[] = [
	{
		code: 'VAS',
		name: 'Vanguard Australian Shares Index ETF',
		assetAllocation: {
			ausEquities: 1,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VGS',
		name: 'Vanguard MSCI Index International Shares ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VAF',
		name: 'Vanguard Australian Fixed Interest Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 1,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VGE',
		name: 'Vanguard FTSE Emerging Markets Shares ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VIF',
		name: 'Vanguard International Fixed Interest Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 1,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VDHG',
		name: 'Vanguard Diversified High Growth Index ETF',
		assetAllocation: {
			ausEquities: 0.36,
			intEquities: 0.54,
			ausFixedInterest: 0.03,
			intFixedInterest: 0.07,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VDGR',
		name: 'Vanguard Diversified Growth Index ETF',
		assetAllocation: {
			ausEquities: 0.3,
			intEquities: 0.45,
			ausFixedInterest: 0.07,
			intFixedInterest: 0.18,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VDBA',
		name: 'Vanguard Diversified Balanced Index ETF',
		assetAllocation: {
			ausEquities: 0.24,
			intEquities: 0.36,
			ausFixedInterest: 0.12,
			intFixedInterest: 0.28,
			cash: 0,
			alternatives: 0
		}
	},
	{
		code: 'VDCO',
		name: 'Vanguard Diversified Conservative Index ETF',
		assetAllocation: {
			ausEquities: 0.18,
			intEquities: 0.27,
			ausFixedInterest: 0.16,
			intFixedInterest: 0.39,
			cash: 0,
			alternatives: 0
		}
	}
];

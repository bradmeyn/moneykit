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

type Investment = {
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
		this.updateUnallocatedCash();
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

	private updateUnallocatedCash = () => {
		const totalWeight = this.investments
			.filter((i) => i.investment.code !== 'CASH')
			.reduce((sum, holding) => sum + holding.weight, 0);

		const unallocatedWeight = Math.max(0, 1 - totalWeight);

		if (unallocatedWeight > 0) {
			const cashHolding: PortfolioHolding = {
				...unallocatedCash,
				value: this.portfolioValue * unallocatedWeight,
				weight: unallocatedWeight
			};
			this.investments = [
				...this.investments.filter((i) => i.investment.code !== 'CASH'),
				cashHolding
			];
		} else {
			this.investments = this.investments.filter((i) => i.investment.code !== 'CASH');
		}
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

const unallocatedCash: PortfolioHolding = {
	investment: {
		code: 'CASH',
		name: 'Unallocated Cash',
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
	unallocatedCash
];

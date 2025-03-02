import { setContext, getContext } from 'svelte';
import { ETF_MAP, type ExchangeTradedFund, type AssetAllocation } from './investments';

export type PortfolioHolding = {
	investment: ExchangeTradedFund;
	value: number;
	weight: number;
	cost: number; // management cost * value
};

// Portfolio asset allocation type to track overall allocation
class Portfolio {
	portfolioValue = $state(2000000);
	investments = $state<PortfolioHolding[]>(defaultPortfolio);

	// Derived values
	portfolio: PortfolioHolding[] = $derived(this.calculateWeights());
	total = $derived(this.calculateTotal());
	totalWeight = $derived(this.calculateTotalWeight());
	assetAllocation = $derived(this.calculateAssetAllocation());
	weightedManagementCost = $derived(this.calculateWeightedManagementCost());
	addInvestment = (investment: PortfolioHolding) => {
		this.investments.push(investment);
	};

	updateWeight = (symbol: string, newWeight: number) => {
		this.investments = this.investments.map((item) => {
			if (item.investment.symbol === symbol) {
				return {
					...item,
					weight: newWeight,
					value: this.portfolioValue * newWeight,
					cost: item.investment.managementCost * this.portfolioValue * newWeight
				};
			}
			return item;
		});
	};

	removeInvestment = (symbol: string) => {
		this.investments = this.investments.filter((i) => i.investment.symbol !== symbol);
	};

	private calculateWeights() {
		return this.investments.map((holding) => {
			const adjustedValue = holding.value / this.portfolioValue;
			const cost = holding.investment.managementCost * holding.value;
			return { ...holding, weight: adjustedValue, cost };
		});
	}

	private calculateTotal() {
		return this.portfolio.reduce((acc, holding) => acc + holding.value, 0);
	}

	private calculateTotalWeight() {
		return this.investments.reduce((acc, holding) => acc + holding.weight, 0);
	}

	private calculateAssetAllocation(): AssetAllocation {
		const initialAllocation: AssetAllocation = {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		};

		return this.portfolio.reduce((allocation, holding) => {
			const weight = holding.weight;
			const asset = holding.investment.assetAllocation;

			return {
				ausEquities: allocation.ausEquities + asset.ausEquities * weight,
				intEquities: allocation.intEquities + asset.intEquities * weight,
				ausFixedInterest: allocation.ausFixedInterest + asset.ausFixedInterest * weight,
				intFixedInterest: allocation.intFixedInterest + asset.intFixedInterest * weight,
				cash: allocation.cash + asset.cash * weight,
				alternatives: allocation.alternatives + asset.alternatives * weight
			};
		}, initialAllocation);
	}

	private calculateWeightedManagementCost() {
		return this.portfolio.reduce((acc, holding) => {
			return acc + holding.weight * (holding.investment.managementCost || 0);
		}, 0);
	}
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
		symbol: 'CASH',
		name: 'Cash Account',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 1,
			alternatives: 0
		},
		managementCost: 0,
		provider: 'BetaShares', // This is a placeholder, you may want a different provider
		benchmark: 'None',
		domicile: 'Australia'
	},
	value: 0,
	weight: 0,
	cost: 0
};

// Convert existing investments to use ETF_MAP
const defaultPortfolio: PortfolioHolding[] = [
	{
		investment: ETF_MAP['VAS'],
		value: 500000,
		weight: 0.25,
		cost: 450000
	},
	{
		investment: ETF_MAP['VGS'],
		value: 700000,
		weight: 0.35,
		cost: 650000
	},
	{
		investment: ETF_MAP['VAF'],
		value: 300000,
		weight: 0.15,
		cost: 290000
	},

	{
		investment: ETF_MAP['VGB'],
		value: 200000,
		weight: 0.1,
		cost: 190000
	},
	cashAccount
];

// Helper function to get available ETFs for portfolio selection
export function getAvailableETFs(): ExchangeTradedFund[] {
	return Object.values(ETF_MAP);
}

// Helper function to calculate portfolio performance metrics
export function calculatePortfolioMetrics(portfolio: PortfolioHolding[]) {
	const totalValue = portfolio.reduce((acc, holding) => acc + holding.value, 0);
	const totalCost = portfolio.reduce((acc, holding) => acc + (holding.cost || holding.value), 0);
	const totalReturn = totalCost > 0 ? totalValue - totalCost : 0;
	const totalReturnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

	// Calculate weighted management cost
	const weightedCost = portfolio.reduce((acc, holding) => {
		return acc + holding.weight * (holding.investment.managementCost || 0);
	}, 0);

	return {
		totalValue,
		totalCost,
		totalReturn,
		totalReturnPercentage,
		weightedManagementCost: weightedCost
	};
}

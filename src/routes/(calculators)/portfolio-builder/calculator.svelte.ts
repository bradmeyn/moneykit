import { setContext, getContext } from 'svelte';
import { ETF_MAP, type ExchangeTradedFund, type AssetAllocation } from './investments';
import { formatAsPercentage } from '$utils/formatters';

export type PortfolioHolding = {
	investment: ExchangeTradedFund;
	value: number;
	weight: number;
	cost: number; // management cost * value
};

class Portfolio {
	portfolioValue = $state(2000000);
	investments = $state<PortfolioHolding[]>(defaultPortfolio);

	// Derived values
	portfolio: PortfolioHolding[] = $derived(this.calculateHoldingDetails());
	totalAllocated = $derived(this.portfolio?.reduce((acc, holding) => acc + holding.value, 0) || 0);
	totalValue = $derived(this.portfolio?.reduce((acc, holding) => acc + holding.value, 0) || 0);
	totalWeight = $derived(this.portfolio?.reduce((acc, holding) => acc + holding.weight, 0) || 0);
	assetAllocation = $derived(this.calculateAssetAllocation());
	totalCost = $derived(this.portfolio?.reduce((acc, holding) => acc + holding.cost, 0) || 0);
	addInvestment = (investment: PortfolioHolding) => {
		// Add investment, keep cash account at the end
		this.investments = [...this.investments.slice(0, -1), investment, cashAccount];
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

	private calculateHoldingDetails() {
		// First process all non-cash holdings
		const nonCashHoldings = this.investments
			.filter((holding) => holding.investment.symbol !== 'CASH')
			.map((holding) => {
				const value = holding.value;
				const weight = value / this.portfolioValue;
				const cost = holding.investment.managementCost * value;

				return {
					...holding,
					weight,
					cost
				};
			});

		// Calculate total value and weight of non-cash holdings
		const nonCashTotal = nonCashHoldings.reduce((acc, holding) => acc + holding.value, 0);
		const nonCashWeight = nonCashTotal / this.portfolioValue;

		// Find the cash holding
		const cashHolding = this.investments.find((h) => h.investment.symbol === 'CASH');

		// Calculate cash values
		const cashValue = Math.max(0, this.portfolioValue - nonCashTotal);
		const cashWeight = Math.max(0, 1 - nonCashWeight);

		// Update cash holding
		const updatedCashHolding = {
			...(cashHolding || cashAccount),
			value: cashValue,
			weight: cashWeight,
			cost: 0
		};

		// Return combined holdings with cash at the end
		return [...nonCashHoldings, updatedCashHolding];
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

	// Method to get portfolio overview data as CSV
	// Method to get portfolio overview data as CSV
	getPortfolioOverviewCsv() {
		const headers = [
			'Investment',
			'Symbol',
			'Value',
			'Weight',
			'Management Fee (%)',
			'Management Fee ($)',
			'Australian Equities',
			'International Equities',
			'Australian Fixed Interest',
			'International Fixed Interest',
			'Cash',
			'Alternatives'
		];

		const rows = this.portfolio.map((holding) => {
			const asset = holding.investment.assetAllocation;
			return [
				holding.investment.name,
				holding.investment.symbol,
				holding.value,
				formatAsPercentage(holding.weight),
				formatAsPercentage(holding.investment.managementCost),
				holding.cost,
				formatAsPercentage(asset.ausEquities),
				formatAsPercentage(asset.intEquities),
				formatAsPercentage(asset.ausFixedInterest),
				formatAsPercentage(asset.intFixedInterest),
				formatAsPercentage(asset.cash),
				formatAsPercentage(asset.alternatives)
			];
		});

		// Add total row
		const totalAllocation = this.assetAllocation;
		rows.push([
			'Total',
			'',
			this.totalAllocated,
			formatAsPercentage(this.totalWeight),
			formatAsPercentage(this.totalCost / this.totalAllocated),
			this.totalCost,
			formatAsPercentage(totalAllocation.ausEquities),
			formatAsPercentage(totalAllocation.intEquities),
			formatAsPercentage(totalAllocation.ausFixedInterest),
			formatAsPercentage(totalAllocation.intFixedInterest),
			formatAsPercentage(totalAllocation.cash),
			formatAsPercentage(totalAllocation.alternatives)
		]);

		return { headers, rows };
	}

	// Method to get asset class summary data as CSV
	getAssetClassSummaryCsv() {
		const headers = ['Asset Class', 'Value', 'Weight'];

		// Calculate values for each asset class
		const totalAllocation = this.assetAllocation;
		const totalValue = this.totalAllocated;

		// Create rows for each asset class
		const rows = [
			[
				'Australian Equities',
				totalAllocation.ausEquities * totalValue,
				formatAsPercentage(totalAllocation.ausEquities)
			],
			[
				'International Equities',
				totalAllocation.intEquities * totalValue,
				formatAsPercentage(totalAllocation.intEquities)
			],
			[
				'Australian Fixed Interest',
				totalAllocation.ausFixedInterest * totalValue,
				formatAsPercentage(totalAllocation.ausFixedInterest)
			],
			[
				'International Fixed Interest',
				totalAllocation.intFixedInterest * totalValue,
				formatAsPercentage(totalAllocation.intFixedInterest)
			],
			['Cash', totalAllocation.cash * totalValue, formatAsPercentage(totalAllocation.cash)],
			[
				'Alternatives',
				totalAllocation.alternatives * totalValue,
				formatAsPercentage(totalAllocation.alternatives)
			],
			['Total', totalValue, formatAsPercentage(this.totalWeight)],
			[
				'', // Empty row
				'',
				''
			],
			// Calculate growth assets (Australian Equities, International Equities, Alternatives)
			[
				'Growth Assets',
				(totalAllocation.ausEquities + totalAllocation.intEquities + totalAllocation.alternatives) *
					totalValue,
				formatAsPercentage(
					totalAllocation.ausEquities + totalAllocation.intEquities + totalAllocation.alternatives
				)
			],
			// Calculate defensive assets (Fixed Interest, Cash)
			[
				'Defensive Assets',
				(totalAllocation.ausFixedInterest +
					totalAllocation.intFixedInterest +
					totalAllocation.cash) *
					totalValue,
				formatAsPercentage(
					totalAllocation.ausFixedInterest + totalAllocation.intFixedInterest + totalAllocation.cash
				)
			]
		];

		return { headers, rows };
	}

	// Method to get combined data for all tables
	getAllDataCsv() {
		const overviewData = this.getPortfolioOverviewCsv();
		const assetClassSummary = this.getAssetClassSummaryCsv();

		// Combine with blank row separators
		const headers = overviewData.headers;
		const rows = [
			...overviewData.rows,
			Array(headers.length).fill(''), // Empty row as separator
			['ASSET CLASS SUMMARY'], // Title for the next section
			Array(headers.length).fill(''), // Empty row as separator
			assetClassSummary.headers,
			...assetClassSummary.rows
		];

		return { headers, rows };
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
		provider: 'BetaShares',
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

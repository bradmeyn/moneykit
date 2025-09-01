import { setContext, getContext } from 'svelte';
import { ETF_MAP, type ExchangeTradedFund, type AssetAllocation } from './investments';
import { formatAsPercentage } from '$utils/formatters';

export type PortfolioHolding = {
	investment: ExchangeTradedFund;
	weight: number;
};

// Derived holding with calculated values
export type CalculatedHolding = PortfolioHolding & {
	value: number;
	cost: number;
};

export type YearlyReturns = {
	growth: number;
	distribution: number;
	total: number;
};

export type PortfolioReturns = {
	byYear: Record<number, YearlyReturns>;
};

class Portfolio {
	constructor(portfolio: number) {
		this.investments = portfolio === 1 ? defaultPortfolio : defaultPortfolioTwo;
	}

	portfolioValue = $state(2000000);
	investments = $state<PortfolioHolding[]>(defaultPortfolio);

	// Derived values - these will automatically update when portfolioValue changes
	holdings: CalculatedHolding[] = $derived(this.calculateHoldingDetails());
	totalAllocated = $derived(this.holdings.reduce((acc, holding) => acc + holding.value, 0));
	totalValue = $derived(this.holdings.reduce((acc, holding) => acc + holding.value, 0));
	totalWeight = $derived(this.holdings.reduce((acc, holding) => acc + holding.weight, 0));
	assetAllocation = $derived(this.calculateAssetAllocation());
	totalCost = $derived(this.holdings.reduce((acc, holding) => acc + holding.cost, 0));
	totalCostPercentage = $derived(this.totalCost / this.portfolioValue);

	// Derived value for portfolio returns (example: weighted average return)
	returns = $derived(this.calculateReturns());

	// Derived value for summary statistics
	summaryStats = $derived(this.calculateSummaryStats());

	private calculateReturns(): PortfolioReturns {
		// Get all available years from the portfolio holdings
		const availableYears = new Set<number>();

		for (const holding of this.holdings) {
			if (holding.investment.returns?.annual) {
				const years = Object.keys(holding.investment.returns.annual).map(Number);
				years.forEach((year) => availableYears.add(year));
			}
		}

		// Sort years in descending order (most recent first)
		const sortedYears = Array.from(availableYears).sort((a, b) => b - a);

		const byYear: Record<number, YearlyReturns> = {};

		for (const year of sortedYears) {
			let weightedGrowth = 0;
			let weightedDistribution = 0;
			let weightedTotal = 0;
			let totalWeight = 0;

			// Only include non-cash holdings in returns calculation
			const nonCashHoldings = this.holdings.filter((h) => h.investment.symbol !== 'CASH');

			for (const holding of nonCashHoldings) {
				const yearData = holding.investment.returns?.annual?.[year];
				if (yearData) {
					const weight = holding.weight;
					weightedGrowth += yearData.growth * weight;
					weightedDistribution += yearData.distribution * weight;
					weightedTotal += yearData.total * weight;
					totalWeight += weight;
				}
			}

			if (totalWeight > 0) {
				byYear[year] = {
					growth: weightedGrowth,
					distribution: weightedDistribution,
					total: weightedTotal
				};
			}
		}

		return { byYear };
	}

	private calculateSummaryStats() {
		const yearReturns = Object.entries(this.returns.byYear)
			.map(([year, yearData]) => ({ year, total: yearData.total }))
			.filter(({ total }) => total !== undefined);

		const returns = yearReturns.map(({ total }) => total);

		const calcAverage = (arr: number[]) =>
			arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
		const calcVolatility = (arr: number[]) => {
			if (arr.length <= 1) return 0;
			const avg = calcAverage(arr);
			const variance = arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (arr.length - 1);
			return Math.sqrt(variance);
		};

		const bestObj =
			returns.length > 0
				? yearReturns.reduce(
						(best, curr) => (curr.total > best.total ? curr : best),
						yearReturns[0]
					)
				: { year: '', total: 0 };

		const worstObj =
			returns.length > 0
				? yearReturns.reduce(
						(worst, curr) => (curr.total < worst.total ? curr : worst),
						yearReturns[0]
					)
				: { year: '', total: 0 };

		return {
			average: calcAverage(returns),
			volatility: calcVolatility(returns),
			best: bestObj.total,
			bestYear: bestObj.year,
			worst: worstObj.total,
			worstYear: worstObj.year,
			totalReturn: returns.reduce((a, b) => a + b, 0),
			annualisedReturn:
				(Math.pow(1 + returns.reduce((a, b) => a + b, 0) / 100, 1 / returns.length) - 1) * 100
		};
	}

	addInvestment = (investment: PortfolioHolding) => {
		this.investments = [...this.investments.slice(0, -1), investment, cashAccount];
	};

	updateWeight = (symbol: string, newWeight: number) => {
		this.investments = this.investments.map((item) => {
			if (item.investment.symbol === symbol) {
				return {
					...item,
					weight: newWeight
				};
			}
			return item;
		});
	};

	removeInvestment = (symbol: string) => {
		this.investments = this.investments.filter((i) => i.investment.symbol !== symbol);
	};

	private calculateHoldingDetails(): CalculatedHolding[] {
		const nonCashHoldings = this.investments
			.filter((holding) => holding.investment.symbol !== 'CASH')
			.map((holding) => {
				// Calculate value based on current portfolioValue and weight
				const value = this.portfolioValue * holding.weight;
				const cost = holding.investment.managementCost * value;

				return {
					...holding,
					value,
					cost
				};
			});

		// Calculate total weight of non-cash holdings
		const nonCashWeight = nonCashHoldings.reduce((acc, holding) => acc + holding.weight, 0);

		// Find the cash holding
		const cashHolding = this.investments.find((h) => h.investment.symbol === 'CASH');

		// Calculate cash values
		const cashWeight = Math.max(0, 1 - nonCashWeight);
		const cashValue = this.portfolioValue * cashWeight;

		// Update cash holding
		const updatedCashHolding: CalculatedHolding = {
			...(cashHolding || cashAccount),
			weight: cashWeight,
			value: cashValue,
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

		return this.holdings.reduce((allocation, holding) => {
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
	getPortfolioOverviewCsv() {
		const columns = [
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

		const rows = this.holdings.map((holding) => {
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

		return { columns, rows };
	}

	// Method to get asset class summary data as CSV
	getAssetClassSummaryCsv() {
		const columns = ['Asset Class', 'Value', 'Weight'];

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

		return { columns, rows };
	}

	// Method to get combined data for all tables
	getAllDataCsv() {
		const overviewData = this.getPortfolioOverviewCsv();
		const assetClassSummary = this.getAssetClassSummaryCsv();

		// Combine with blank row separators
		const columns = overviewData.columns;
		const rows = [
			...overviewData.rows,
			Array(columns.length).fill(''), // Empty row as separator
			['ASSET CLASS SUMMARY'], // Title for the next section
			Array(columns.length).fill(''), // Empty row as separator
			assetClassSummary.columns,
			...assetClassSummary.rows
		];

		return { columns, rows };
	}
}

export type PortfolioType = InstanceType<typeof Portfolio>;

const PORTFOLIO_KEY = Symbol('portfolio');

export function setPortfolioState(portfolio: number) {
	return setContext(PORTFOLIO_KEY, new Portfolio(portfolio));
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
	weight: 0
};

// Convert existing investments to use weights instead of fixed values
const defaultPortfolio: PortfolioHolding[] = [
	{
		investment: ETF_MAP['VAS'],
		weight: 0.25 // 25%
	},
	{
		investment: ETF_MAP['VGS'],
		weight: 0.35 // 35%
	},
	{
		investment: ETF_MAP['VAF'],
		weight: 0.15 // 15%
	},
	{
		investment: ETF_MAP['VIF'],
		weight: 0.1 // 10%
	},
	cashAccount // Cash will auto-calculate to fill remaining 15%
];

const defaultPortfolioTwo: PortfolioHolding[] = [
	{
		investment: ETF_MAP['VGS'],
		weight: 0.7 // 25%
	},
	{
		investment: ETF_MAP['VAS'],
		weight: 0.3 // 35%
	},

	cashAccount // Cash will auto-calculate to fill remaining 15%
];

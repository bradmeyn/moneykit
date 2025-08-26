import { VANGUARD_ETFS } from './vanguard-etfs';
import { BETASHARES_ETFS } from './betashares-etfs';

// Make the asset allocation values numbers instead of strings for calculations
export type AssetAllocation = {
	ausEquities: number;
	intEquities: number;
	ausFixedInterest: number;
	intFixedInterest: number;
	cash: number;
	alternatives: number;
};

export const assetLabels = {
	ausEquities: 'Australian Equities',
	intEquities: 'International Equities',
	ausFixedInterest: 'Australian Fixed Interest',
	intFixedInterest: 'International Fixed Interest',
	cash: 'Cash',
	alternatives: 'Alternatives',
	unallocated: 'Unallocated'
};

interface Investment {
	symbol: string;
	name: string;
	assetAllocation: AssetAllocation;
}

export interface ETFReturns {
	annual: {
		[year: number]: {
			growth: number;
			distribution: number;
			total: number;
			grossReturn: number;
			benchmark: number | null;
		};
	};
	monthly: {
		[year: number]: {
			[month: string]: number; // month abbreviation (Jan, Feb, etc.)
		};
	};
}

export interface ExchangeTradedFund extends Investment {
	managementCost: number; // Stored as decimal: 0.10% = 0.0010
	provider: 'Vanguard' | 'BetaShares';
	benchmark: string;
	domicile: 'Australia' | 'International';
	returns?: ETFReturns; // Optional since some ETFs might not have returns data yet
}

// Combined ETF map with cash option
export const ETF_MAP: Record<string, ExchangeTradedFund> = {
	// Cash option
	CASH: {
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
		managementCost: 0.0, // 0.00%
		provider: 'BetaShares', // Placeholder
		benchmark: 'RBA Cash Rate',
		domicile: 'Australia'
	},

	// Vanguard ETFs (with comprehensive returns data)
	...VANGUARD_ETFS

	// BetaShares ETFs (popular options)
	// ...BETASHARES_ETFS
};

// Helper functions
export const getETFList = (): ExchangeTradedFund[] => Object.values(ETF_MAP);

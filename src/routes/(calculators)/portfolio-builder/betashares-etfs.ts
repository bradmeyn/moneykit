import type { ExchangeTradedFund } from './investments';

export const BETASHARES_ETFS: Record<string, ExchangeTradedFund> = {
	A200: {
		symbol: 'A200',
		name: 'BetaShares Australia 200 ETF',
		assetAllocation: {
			ausEquities: 1.0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0007, // 0.07%
		provider: 'BetaShares',
		benchmark: 'Solactive Australia 200 Index',
		domicile: 'Australia'
	},

	NDQ: {
		symbol: 'NDQ',
		name: 'BetaShares NASDAQ 100 ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0048, // 0.48%
		provider: 'BetaShares',
		benchmark: 'NASDAQ-100 Index',
		domicile: 'Australia'
	},

	BGBL: {
		symbol: 'BGBL',
		name: 'BetaShares Global Government Bond 20+ Year ETF (Currency Hedged)',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 1.0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0022, // 0.22%
		provider: 'BetaShares',
		benchmark: 'ICE BofA 20+ Year Global Government Bond Index (AUD Hedged)',
		domicile: 'Australia'
	},

	IVV: {
		symbol: 'IVV',
		name: 'iShares Core S&P 500 ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0004, // 0.04%
		provider: 'BetaShares',
		benchmark: 'S&P 500 Index',
		domicile: 'Australia'
	},

	IJH: {
		symbol: 'IJH',
		name: 'iShares Core S&P Mid-Cap ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0007, // 0.07%
		provider: 'BetaShares',
		benchmark: 'S&P MidCap 400 Index',
		domicile: 'Australia'
	},

	IJR: {
		symbol: 'IJR',
		name: 'iShares Core S&P Small-Cap ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0007, // 0.07%
		provider: 'BetaShares',
		benchmark: 'S&P SmallCap 600 Index',
		domicile: 'Australia'
	},

	QUAL: {
		symbol: 'QUAL',
		name: 'BetaShares Global Quality Leaders ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0035, // 0.35%
		provider: 'BetaShares',
		benchmark: 'Nasdaq Global ex Australia Quality Leaders Index',
		domicile: 'Australia'
	}
};

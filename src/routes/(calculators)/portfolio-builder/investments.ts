// Make the asset allocation values numbers instead of strings for calculations
export type AssetAllocation = {
	ausEquities: number;
	intEquities: number;
	ausFixedInterest: number;
	intFixedInterest: number;
	cash: number;
	alternatives: number;
};

interface Investment {
	symbol: string;
	name: string;
	assetAllocation: AssetAllocation;
}

export interface ExchangeTradedFund extends Investment {
	managementCost: number; // Stored as decimal: 0.10% = 0.0010
	provider: 'Vanguard' | 'BetaShares';
	benchmark: string;
	domicile: 'Australia' | 'International';
}

// Using type alias for clarity
type ETF = ExchangeTradedFund;

// Map structure with symbol as key
export const ETF_MAP: Record<string, ETF> = {
	// Vanguard ETFs
	VAS: {
		symbol: 'VAS',
		name: 'Vanguard Australian Shares Index ETF',
		assetAllocation: {
			ausEquities: 1.0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.001, // 0.10%
		provider: 'Vanguard',
		benchmark: 'S&P/ASX 300 Index',
		domicile: 'Australia'
	},
	VGS: {
		symbol: 'VGS',
		name: 'Vanguard MSCI Index International Shares ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0018, // 0.18%
		provider: 'Vanguard',
		benchmark: 'MSCI World ex-Australia Index',
		domicile: 'Australia'
	},
	VGB: {
		symbol: 'VGB',
		name: 'Vanguard Australian Government Bond Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 1.0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.002, // 0.20%
		provider: 'Vanguard',
		benchmark: 'Bloomberg AusBond Government Bond Index',
		domicile: 'Australia'
	},
	VGE: {
		symbol: 'VGE',
		name: 'Vanguard FTSE Emerging Markets Shares ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0048, // 0.48%
		provider: 'Vanguard',
		benchmark: 'FTSE Emerging Markets All Cap China A Inclusion Index',
		domicile: 'Australia'
	},
	VAF: {
		symbol: 'VAF',
		name: 'Vanguard Australian Fixed Interest Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 1.0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.002, // 0.20%
		provider: 'Vanguard',
		benchmark: 'Bloomberg AusBond Composite 0+ Yr Index',
		domicile: 'Australia'
	},
	VDCO: {
		symbol: 'VDCO',
		name: 'Vanguard Diversified Conservative Index ETF',
		assetAllocation: {
			ausEquities: 0.12,
			intEquities: 0.18,
			ausFixedInterest: 0.35,
			intFixedInterest: 0.35,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0027, // 0.27%
		provider: 'Vanguard',
		benchmark: 'Vanguard Diversified Conservative Index',
		domicile: 'Australia'
	},
	VDBA: {
		symbol: 'VDBA',
		name: 'Vanguard Diversified Balanced Index ETF',
		assetAllocation: {
			ausEquities: 0.2,
			intEquities: 0.3,
			ausFixedInterest: 0.25,
			intFixedInterest: 0.25,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0027, // 0.27%
		provider: 'Vanguard',
		benchmark: 'Vanguard Diversified Balanced Index',
		domicile: 'Australia'
	},
	VDGR: {
		symbol: 'VDGR',
		name: 'Vanguard Diversified Growth Index ETF',
		assetAllocation: {
			ausEquities: 0.28,
			intEquities: 0.42,
			ausFixedInterest: 0.15,
			intFixedInterest: 0.15,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0027, // 0.27%
		provider: 'Vanguard',
		benchmark: 'Vanguard Diversified Growth Index',
		domicile: 'Australia'
	},
	VDHG: {
		symbol: 'VDHG',
		name: 'Vanguard Diversified High Growth Index ETF',
		assetAllocation: {
			ausEquities: 0.36,
			intEquities: 0.54,
			ausFixedInterest: 0.05,
			intFixedInterest: 0.05,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0027, // 0.27%
		provider: 'Vanguard',
		benchmark: 'Vanguard Diversified High Growth Index',
		domicile: 'Australia'
	},

	// BetaShares ETFs
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
	DZZF: {
		symbol: 'DZZF',
		name: 'BetaShares Diversified Conservative Income ETF',
		assetAllocation: {
			ausEquities: 0.08,
			intEquities: 0.12,
			ausFixedInterest: 0.4,
			intFixedInterest: 0.32,
			cash: 0.08,
			alternatives: 0
		},
		managementCost: 0.0026, // 0.26%
		provider: 'BetaShares',
		benchmark: 'Dimensional Conservative Income Index',
		domicile: 'Australia'
	},
	DBBF: {
		symbol: 'DBBF',
		name: 'BetaShares Diversified Balanced ETF',
		assetAllocation: {
			ausEquities: 0.21,
			intEquities: 0.29,
			ausFixedInterest: 0.3,
			intFixedInterest: 0.15,
			cash: 0.05,
			alternatives: 0
		},
		managementCost: 0.0026, // 0.26%
		provider: 'BetaShares',
		benchmark: 'Dimensional Balanced Index',
		domicile: 'Australia'
	},
	DGGF: {
		symbol: 'DGGF',
		name: 'BetaShares Diversified Growth ETF',
		assetAllocation: {
			ausEquities: 0.28,
			intEquities: 0.42,
			ausFixedInterest: 0.15,
			intFixedInterest: 0.1,
			cash: 0.05,
			alternatives: 0
		},
		managementCost: 0.0026, // 0.26%
		provider: 'BetaShares',
		benchmark: 'Dimensional Growth Index',
		domicile: 'Australia'
	},
	DHHF: {
		symbol: 'DHHF',
		name: 'BetaShares Diversified All Growth ETF',
		assetAllocation: {
			ausEquities: 0.37,
			intEquities: 0.63,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0019, // 0.19%
		provider: 'BetaShares',
		benchmark: 'Dimensional All Growth Index',
		domicile: 'Australia'
	},
	AAA: {
		symbol: 'AAA',
		name: 'BetaShares Australian High Interest Cash ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 1.0,
			alternatives: 0
		},
		managementCost: 0.0018, // 0.18%
		provider: 'BetaShares',
		benchmark: 'Australian Bank Bill Swap Rate (BBSW)',
		domicile: 'Australia'
	},
	HBRD: {
		symbol: 'HBRD',
		name: 'BetaShares Active Australian Hybrids Fund',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0.9,
			intFixedInterest: 0,
			cash: 0.1,
			alternatives: 0
		},
		managementCost: 0.0055, // 0.55%
		provider: 'BetaShares',
		benchmark: 'Solactive Australian Hybrid Securities Index',
		domicile: 'Australia'
	},
	CRED: {
		symbol: 'CRED',
		name: 'BetaShares Australian Investment Grade Corporate Bond ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 1.0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0025, // 0.25%
		provider: 'BetaShares',
		benchmark: 'Solactive Australian Investment Grade Corporate Bond Select TR Index',
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
	ETHI: {
		symbol: 'ETHI',
		name: 'BetaShares Global Sustainability Leaders ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0,
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0059, // 0.59%
		provider: 'BetaShares',
		benchmark: 'Nasdaq Global Ethical Leaders Index',
		domicile: 'Australia'
	},
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
		benchmark: 'None',
		domicile: 'Australia'
	}
};

// Helper function to get an array of ETFs if needed
export const getETFList = (): ETF[] => Object.values(ETF_MAP);

// Helper function to get ETFs by provider
export const getETFsByProvider = (provider: 'Vanguard' | 'BetaShares'): ETF[] =>
	Object.values(ETF_MAP).filter((etf) => etf.provider === provider);

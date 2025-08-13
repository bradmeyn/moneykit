import type { ExchangeTradedFund } from './investments';

export const VANGUARD_ETFS: Record<string, ExchangeTradedFund> = {
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
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.0749,
					distribution: 0.0386,
					total: 0.1136,
					grossReturn: 0.1144,
					benchmark: 0.1139
				},
				2023: {
					growth: 0.0781,
					distribution: 0.0425,
					total: 0.1206,
					grossReturn: 0.1215,
					benchmark: 0.1213
				},
				2022: {
					growth: -0.0873,
					distribution: 0.0695,
					total: -0.0178,
					grossReturn: -0.0169,
					benchmark: -0.0177
				},
				2021: {
					growth: 0.1337,
					distribution: 0.0427,
					total: 0.1764,
					grossReturn: 0.1775,
					benchmark: 0.1754
				},
				2020: {
					growth: -0.0074,
					distribution: 0.0261,
					total: 0.0187,
					grossReturn: 0.0197,
					benchmark: 0.0173
				},
				2019: {
					growth: 0.1849,
					distribution: 0.0514,
					total: 0.2362,
					grossReturn: 0.2377,
					benchmark: 0.2377
				},
				2018: {
					growth: -0.0753,
					distribution: 0.0435,
					total: -0.0318,
					grossReturn: -0.0304,
					benchmark: -0.0306
				},
				2017: {
					growth: 0.0787,
					distribution: 0.0396,
					total: 0.1184,
					grossReturn: 0.1199,
					benchmark: 0.1194
				},
				2016: {
					growth: 0.0687,
					distribution: 0.0473,
					total: 0.116,
					grossReturn: 0.1176,
					benchmark: 0.1179
				},
				2015: {
					growth: -0.0195,
					distribution: 0.0459,
					total: 0.0265,
					grossReturn: 0.028,
					benchmark: 0.028
				},
				2014: {
					growth: 0.0104,
					distribution: 0.0415,
					total: 0.0519,
					grossReturn: 0.0535,
					benchmark: 0.053
				},
				2013: {
					growth: 0.1443,
					distribution: 0.0507,
					total: 0.195,
					grossReturn: 0.1967,
					benchmark: 0.1968
				},
				2012: {
					growth: 0.1401,
					distribution: 0.0556,
					total: 0.1956,
					grossReturn: 0.1974,
					benchmark: 0.1974
				},
				2011: {
					growth: -0.15,
					distribution: 0.0393,
					total: -0.1107,
					grossReturn: -0.109,
					benchmark: -0.1098
				},
				2010: {
					growth: -0.0289,
					distribution: 0.045,
					total: 0.0161,
					grossReturn: 0.0189,
					benchmark: 0.019
				}
			},
			monthly: {
				2025: {
					Jan: 0.0447,
					Feb: -0.038,
					Mar: -0.0336,
					Apr: 0.036,
					May: 0.0419,
					Jun: 0.0141,
					Jul: 0.0242
				},
				2024: {
					Jan: 0.011,
					Feb: 0.0098,
					Mar: 0.0327,
					Apr: -0.0292,
					May: 0.0084,
					Jun: 0.0092,
					Jul: 0.0413,
					Aug: 0.0045,
					Sep: 0.0306,
					Oct: -0.013,
					Nov: 0.0368,
					Dec: -0.0308
				},
				2023: {
					Jan: 0.0628,
					Feb: -0.0258,
					Mar: -0.0024,
					Apr: 0.0184,
					May: -0.0253,
					Jun: 0.0173,
					Jul: 0.0289,
					Aug: -0.0076,
					Sep: -0.0289,
					Oct: -0.038,
					Nov: 0.0506,
					Dec: 0.0721
				},
				2022: {
					Jan: -0.0644,
					Feb: 0.0208,
					Mar: 0.0687,
					Apr: -0.0085,
					May: -0.0276,
					Jun: -0.0896,
					Jul: 0.0594,
					Aug: 0.0117,
					Sep: -0.062,
					Oct: 0.0594,
					Nov: 0.0648,
					Dec: -0.0333
				},
				2021: {
					Jan: 0.0032,
					Feb: 0.0147,
					Mar: 0.0232,
					Apr: 0.0369,
					May: 0.0231,
					Jun: 0.0224,
					Jul: 0.0111,
					Aug: 0.0262,
					Sep: -0.0181,
					Oct: 0.001,
					Nov: -0.0054,
					Dec: 0.0266
				},
				2020: {
					Jan: 0.0488,
					Feb: -0.0776,
					Mar: -0.2081,
					Apr: 0.0907,
					May: 0.046,
					Jun: 0.025,
					Jul: 0.006,
					Aug: 0.0303,
					Sep: -0.0358,
					Oct: 0.0188,
					Nov: 0.1023,
					Dec: 0.0132
				},
				2019: {
					Jan: 0.0384,
					Feb: 0.0599,
					Mar: 0.0072,
					Apr: 0.0243,
					May: 0.0174,
					Jun: 0.0363,
					Jul: 0.0297,
					Aug: -0.0228,
					Sep: 0.019,
					Oct: -0.0039,
					Nov: 0.0318,
					Dec: -0.0203
				},
				2018: {
					Jan: -0.004,
					Feb: 0.0033,
					Mar: -0.0373,
					Apr: 0.0377,
					May: 0.0118,
					Jun: 0.0318,
					Jul: 0.0129,
					Aug: 0.0139,
					Sep: -0.0122,
					Oct: -0.0616,
					Nov: -0.0218,
					Dec: -0.0023
				},
				2017: {
					Jan: -0.0079,
					Feb: 0.0219,
					Mar: 0.0327,
					Apr: 0.0097,
					May: -0.0275,
					Jun: 0.002,
					Jul: 0.0001,
					Aug: 0.0075,
					Sep: 0.0004,
					Oct: 0.04,
					Nov: 0.0169,
					Dec: 0.0184
				},
				2016: {
					Jan: -0.0545,
					Feb: -0.0173,
					Mar: 0.0474,
					Apr: 0.0331,
					May: 0.0311,
					Jun: -0.0247,
					Jul: 0.0635,
					Aug: -0.0156,
					Sep: 0.005,
					Oct: -0.0218,
					Nov: 0.0282,
					Dec: 0.043
				},
				2015: {
					Jan: 0.0321,
					Feb: 0.069,
					Mar: -0.0008,
					Apr: -0.0167,
					May: 0.0042,
					Jun: -0.0531,
					Jul: 0.0431,
					Aug: -0.0772,
					Sep: -0.0286,
					Oct: 0.044,
					Nov: -0.0069,
					Dec: 0.027
				},
				2014: {
					Jan: -0.0301,
					Feb: 0.0491,
					Mar: 0.0021,
					Apr: 0.0167,
					May: 0.0065,
					Jun: -0.0146,
					Jul: 0.044,
					Aug: 0.0066,
					Sep: -0.0538,
					Oct: 0.0425,
					Nov: -0.0325,
					Dec: 0.0203
				},
				2013: {
					Jan: 0.0497,
					Feb: 0.0526,
					Mar: -0.0227,
					Apr: 0.0428,
					May: -0.0454,
					Jun: -0.0241,
					Jul: 0.0528,
					Aug: 0.0249,
					Sep: 0.0215,
					Oct: 0.0391,
					Nov: -0.0136,
					Dec: 0.0081
				},
				2012: {
					Jan: 0.0511,
					Feb: 0.0202,
					Mar: 0.012,
					Apr: 0.0129,
					May: -0.0673,
					Jun: 0.0052,
					Jul: 0.0418,
					Aug: 0.021,
					Sep: 0.0217,
					Oct: 0.0292,
					Nov: 0.0039,
					Dec: 0.0332
				},
				2011: {
					Jan: 0.0008,
					Feb: 0.0232,
					Mar: 0.0067,
					Apr: -0.0033,
					May: -0.0202,
					Jun: -0.0196,
					Jul: -0.0387,
					Aug: -0.0197,
					Sep: -0.0624,
					Oct: 0.0717,
					Nov: -0.0345,
					Dec: -0.0146
				},
				2010: {
					Jan: -0.062,
					Feb: 0.0201,
					Mar: 0.0573,
					Apr: -0.0134,
					May: -0.0754,
					Jun: -0.0267,
					Jul: 0.0445,
					Aug: -0.0111,
					Sep: 0.0475,
					Oct: 0.018,
					Nov: -0.0095,
					Dec: 0.0369
				},
				2009: {
					Jun: 0.0386,
					Jul: 0.0738,
					Aug: 0.0657,
					Sep: 0.0624,
					Oct: -0.0209,
					Nov: 0.0178,
					Dec: 0.0367
				}
			}
		}
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
		benchmark: 'MSCI World ex-Australia Index (AUD hedged)',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.2695,
					distribution: 0.0427,
					total: 0.3122,
					grossReturn: 0.3146,
					benchmark: 0.3118
				},
				2023: {
					growth: 0.2036,
					distribution: 0.0294,
					total: 0.233,
					grossReturn: 0.2353,
					benchmark: 0.2323
				},
				2022: {
					growth: -0.1398,
					distribution: 0.0153,
					total: -0.1245,
					grossReturn: -0.1229,
					benchmark: -0.1252
				},
				2021: {
					growth: 0.2711,
					distribution: 0.025,
					total: 0.2961,
					grossReturn: 0.2984,
					benchmark: 0.2958
				},
				2020: {
					growth: 0.0333,
					distribution: 0.0247,
					total: 0.058,
					grossReturn: 0.0599,
					benchmark: 0.0573
				},
				2019: {
					growth: 0.2476,
					distribution: 0.0338,
					total: 0.2814,
					grossReturn: 0.2837,
					benchmark: 0.2797
				},
				2018: {
					growth: -0.0108,
					distribution: 0.0266,
					total: 0.0158,
					grossReturn: 0.0176,
					benchmark: 0.0152
				},
				2017: {
					growth: 0.102,
					distribution: 0.0323,
					total: 0.1343,
					grossReturn: 0.1364,
					benchmark: 0.1338
				},
				2016: {
					growth: 0.0362,
					distribution: 0.0442,
					total: 0.0803,
					grossReturn: 0.0823,
					benchmark: 0.0792
				},
				2015: {
					growth: 0.0882,
					distribution: 0.0315,
					total: 0.1198,
					grossReturn: 0.1218,
					benchmark: 0.118
				}
			},
			monthly: {
				2025: {
					Jan: 0.0273,
					Feb: -0.0035,
					Mar: -0.0465,
					Apr: -0.0182,
					May: 0.0535,
					Jun: 0.0246,
					Jul: 0.0311
				},
				2024: {
					Jan: 0.0452,
					Feb: 0.0593,
					Mar: 0.0303,
					Apr: -0.0325,
					May: 0.0203,
					Jun: 0.0162,
					Jul: 0.0608,
					Aug: -0.0124,
					Sep: -0.0047,
					Oct: 0.039,
					Nov: 0.0518,
					Dec: 0.0258
				},
				2023: {
					Jan: 0.0297,
					Feb: 0.0209,
					Mar: 0.0391,
					Apr: 0.0318,
					May: 0.012,
					Jun: 0.0311,
					Jul: 0.0208,
					Aug: 0.0161,
					Sep: -0.0401,
					Oct: -0.0099,
					Nov: 0.0446,
					Dec: 0.0183
				},
				2022: {
					Jan: -0.0219,
					Feb: -0.0551,
					Mar: -0.0087,
					Apr: -0.0318,
					May: -0.008,
					Jun: -0.0462,
					Jul: 0.064,
					Aug: -0.0253,
					Sep: -0.0323,
					Oct: 0.0781,
					Nov: 0.0201,
					Dec: -0.0548
				},
				2021: {
					Jan: -0.0046,
					Feb: 0.0166,
					Mar: 0.051,
					Apr: 0.0319,
					May: 0.0121,
					Jun: 0.047,
					Jul: 0.0403,
					Aug: 0.031,
					Sep: -0.0304,
					Oct: 0.0165,
					Nov: 0.037,
					Dec: 0.0168
				},
				2020: {
					Jan: 0.0434,
					Feb: -0.0488,
					Mar: -0.0828,
					Apr: 0.0361,
					May: 0.034,
					Jun: -0.0112,
					Jul: 0.0061,
					Aug: 0.0347,
					Sep: -0.0031,
					Oct: -0.0112,
					Nov: 0.0743,
					Dec: -0.0049
				},
				2019: {
					Jan: 0.041,
					Feb: 0.0557,
					Mar: 0.0152,
					Apr: 0.0458,
					May: -0.044,
					Jun: 0.0528,
					Jul: 0.0231,
					Aug: 0.0025,
					Sep: 0.0204,
					Oct: 0.0041,
					Nov: 0.0475,
					Dec: -0.0086
				},
				2018: {
					Jan: 0.0173,
					Feb: -0.004,
					Mar: -0.0051,
					Apr: 0.0276,
					May: 0.0039,
					Jun: 0.0232,
					Jul: 0.0251,
					Aug: 0.0414,
					Sep: 0.0056,
					Oct: -0.0541,
					Nov: -0.0183,
					Dec: -0.0424
				},
				2017: {
					Jan: -0.0237,
					Feb: 0.0146,
					Mar: 0.0183,
					Apr: 0.0358,
					May: 0.0279,
					Jun: -0.0264,
					Jul: -0.0167,
					Aug: 0.0082,
					Sep: 0.0344,
					Oct: 0.0427,
					Nov: 0.0324,
					Dec: -0.0172
				},
				2016: {
					Jan: -0.0322,
					Feb: -0.0164,
					Mar: -0.0101,
					Apr: 0.0237,
					May: 0.0604,
					Jun: -0.0381,
					Jul: 0.0198,
					Aug: 0.0133,
					Sep: -0.0131,
					Oct: -0.0139,
					Nov: 0.0452,
					Dec: 0.0467
				},
				2015: {
					Jan: 0.0318,
					Feb: 0.0528,
					Mar: 0.0091,
					Apr: -0.0083,
					May: 0.0353,
					Jun: -0.0267,
					Jul: 0.066,
					Aug: -0.0309,
					Sep: -0.0276,
					Oct: 0.0629,
					Nov: -0.0204,
					Dec: -0.0227
				},
				2014: {
					Dec: 0.0262
				}
			}
		}
	},

	VGE: {
		symbol: 'VGE',
		name: 'Vanguard FTSE Emerging Markets Shares ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0, // Emerging markets equities
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0048, // 0.48%
		provider: 'Vanguard',
		benchmark:
			'FTSE Emerging Markets All Cap China A Inclusion Index (with net dividends reinvested) in AUD',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.1815,
					distribution: 0.0266,
					total: 0.2081,
					grossReturn: 0.2139,
					benchmark: 0.2297
				},
				2023: {
					growth: 0.0469,
					distribution: 0.0292,
					total: 0.076,
					grossReturn: 0.0812,
					benchmark: 0.0882
				},
				2022: {
					growth: -0.1561,
					distribution: 0.0269,
					total: -0.1292,
					grossReturn: -0.125,
					benchmark: -0.1167
				},
				2021: {
					growth: 0.0457,
					distribution: 0.0212,
					total: 0.0669,
					grossReturn: 0.0721,
					benchmark: null // No benchmark data for 2021
				},
				2020: {
					growth: 0.0204,
					distribution: 0.0217,
					total: 0.0421,
					grossReturn: 0.0471,
					benchmark: 0.0519
				},
				2019: {
					growth: 0.1657,
					distribution: 0.0328,
					total: 0.1985,
					grossReturn: 0.2043,
					benchmark: 0.2053
				},
				2018: {
					growth: -0.0777,
					distribution: 0.0178,
					total: -0.0599,
					grossReturn: -0.0554,
					benchmark: -0.0533
				},
				2017: {
					growth: 0.1876,
					distribution: 0.0212,
					total: 0.2088,
					grossReturn: 0.2146,
					benchmark: 0.2129
				},
				2016: {
					growth: 0.0996,
					distribution: 0.0194,
					total: 0.119,
					grossReturn: 0.1243,
					benchmark: 0.123
				},
				2015: {
					growth: -0.0803,
					distribution: 0.0207,
					total: -0.0596,
					grossReturn: -0.055,
					benchmark: -0.0485
				},
				2014: {
					growth: 0.0638,
					distribution: 0.0223,
					total: 0.0862,
					grossReturn: 0.0914,
					benchmark: 0.1064
				}
			},
			monthly: {
				2025: {
					Jan: 0.0004,
					Feb: 0.0102,
					Mar: 0.0103,
					Apr: -0.0266,
					May: 0.0323,
					Jun: 0.0356,
					Jul: 0.0245
				},
				2024: {
					Jan: -0.0048,
					Feb: 0.0502,
					Mar: 0.0168,
					Apr: 0.014,
					May: -0.0029,
					Jun: 0.0145,
					Jul: 0.0348,
					Aug: -0.0286,
					Sep: 0.0488,
					Oct: 0.0305,
					Nov: -0.0165,
					Dec: 0.0372
				},
				2023: {
					Jan: 0.0423,
					Feb: -0.0249,
					Mar: 0.0322,
					Apr: 0.0091,
					May: -0.0093,
					Jun: 0.0172,
					Jul: 0.0455,
					Aug: -0.0212,
					Sep: -0.0227,
					Oct: -0.014,
					Nov: 0.0223,
					Dec: 0.0006
				},
				2022: {
					Jan: 0.036,
					Feb: -0.0655,
					Mar: -0.0658,
					Apr: -0.0052,
					May: -0.0051,
					Jun: 0.0015,
					Jul: -0.0227,
					Aug: 0.0129,
					Sep: -0.0434,
					Oct: -0.0235,
					Nov: 0.091,
					Dec: -0.0372
				},
				2021: {
					Jan: 0.0369,
					Feb: 0.0062,
					Mar: 0.0088,
					Apr: 0.0033,
					May: 0.0146,
					Jun: 0.0436,
					Jul: -0.0391,
					Aug: 0.0275,
					Sep: -0.0237,
					Oct: -0.0261,
					Nov: 0.0283,
					Dec: -0.0114
				},
				2020: {
					Jan: -0.0083,
					Feb: 0.0012,
					Mar: -0.1265,
					Apr: 0.0075,
					May: 0.0184,
					Jun: 0.0256,
					Jul: 0.0421,
					Aug: -0.004,
					Sep: 0.0177,
					Oct: 0.0338,
					Nov: 0.0343,
					Dec: 0.011
				},
				2019: {
					Jan: 0.0584,
					Feb: 0.0207,
					Mar: 0.0241,
					Apr: 0.0303,
					May: -0.049,
					Jun: 0.0389,
					Jul: -0.0006,
					Aug: -0.0106,
					Sep: 0.0059,
					Oct: 0.0172,
					Nov: 0.0234,
					Dec: 0.0279
				},
				2018: {
					Jan: 0.0483,
					Feb: -0.0167,
					Mar: 0.0131,
					Apr: -0.0122,
					May: -0.026,
					Jun: -0.0261,
					Jul: 0.0331,
					Aug: -0.0154,
					Sep: -0.0159,
					Oct: -0.0576,
					Nov: 0.0172,
					Dec: 0.0013
				},
				2017: {
					Jan: 0.0084,
					Feb: 0.0093,
					Mar: 0.036,
					Apr: 0.0357,
					May: 0.0142,
					Jun: -0.0223,
					Jul: 0.0118,
					Aug: 0.0365,
					Sep: 0.0038,
					Oct: 0.0479,
					Nov: 0.0062,
					Dec: 0.0057
				},
				2016: {
					Jan: -0.0307,
					Feb: -0.0131,
					Mar: 0.0458,
					Apr: 0.0179,
					May: 0.0189,
					Jun: 0.0195,
					Jul: 0.03,
					Aug: 0.0195,
					Sep: -0.0008,
					Oct: 0.0086,
					Nov: -0.012,
					Dec: 0.0119
				},
				2015: {
					Jan: 0.0484,
					Feb: 0.0409,
					Mar: 0.0028,
					Apr: 0.0403,
					May: -0.0064,
					Jun: -0.0307,
					Jul: -0.0191,
					Aug: -0.0664,
					Sep: -0.0217,
					Oct: 0.036,
					Nov: -0.0381,
					Dec: -0.0392
				},
				2014: {
					Jan: -0.0614,
					Feb: 0.0064,
					Mar: 0.0093,
					Apr: 0.0095,
					May: 0.0262,
					Jun: 0.0156,
					Jul: 0.0291,
					Aug: 0.0321,
					Sep: -0.0094,
					Oct: 0.0176,
					Nov: 0.0181,
					Dec: -0.0067
				},
				2013: {
					Dec: 0.0174 // Inception 18 Nov 2013
				}
			}
		}
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
		managementCost: 0.0015, // 0.15%
		provider: 'Vanguard',
		benchmark: 'Bloomberg AusBond Composite 0+ Yr Index',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.0016,
					distribution: 0.027,
					total: 0.0286,
					grossReturn: 0.0296,
					benchmark: 0.0293
				},
				2023: {
					growth: 0.0319,
					distribution: 0.0179,
					total: 0.0497,
					grossReturn: 0.0509,
					benchmark: 0.0506
				},
				2022: {
					growth: -0.1059,
					distribution: 0.0069,
					total: -0.099,
					grossReturn: -0.0976,
					benchmark: -0.0971
				},
				2021: {
					growth: -0.0527,
					distribution: 0.0228,
					total: -0.0299,
					grossReturn: -0.0281,
					benchmark: -0.0287
				},
				2020: {
					growth: 0.0085,
					distribution: 0.0347,
					total: 0.0432,
					grossReturn: 0.0453,
					benchmark: 0.0448
				},
				2019: {
					growth: 0.0447,
					distribution: 0.026,
					total: 0.0707,
					grossReturn: 0.0728,
					benchmark: 0.0726
				},
				2018: {
					growth: 0.0155,
					distribution: 0.028,
					total: 0.0435,
					grossReturn: 0.0456,
					benchmark: 0.0454
				},
				2017: {
					growth: 0.0056,
					distribution: 0.0295,
					total: 0.0351,
					grossReturn: 0.0372,
					benchmark: 0.0366
				},
				2016: {
					growth: -0.0161,
					distribution: 0.0439,
					total: 0.0278,
					grossReturn: 0.0298,
					benchmark: 0.0292
				},
				2015: {
					growth: -0.015,
					distribution: 0.0391,
					total: 0.0241,
					grossReturn: 0.0262,
					benchmark: 0.0259
				},
				2014: {
					growth: 0.0493,
					distribution: 0.047,
					total: 0.0963,
					grossReturn: 0.0985,
					benchmark: 0.0981
				},
				2013: {
					growth: -0.0381,
					distribution: 0.0565,
					total: 0.0184,
					grossReturn: 0.0204,
					benchmark: 0.0199
				}
			},
			monthly: {
				2025: {
					Jan: 0.0018,
					Feb: 0.0092,
					Mar: 0.0017,
					Apr: 0.0169,
					May: 0.0016,
					Jun: 0.0074,
					Jul: -0.0004
				},
				2024: {
					Jan: 0.002,
					Feb: -0.0031,
					Mar: 0.0111,
					Apr: -0.0199,
					May: 0.0039,
					Jun: 0.0076,
					Jul: 0.0147,
					Aug: 0.012,
					Sep: 0.003,
					Oct: -0.0189,
					Nov: 0.0113,
					Dec: 0.005
				},
				2023: {
					Jan: 0.0275,
					Feb: -0.0133,
					Mar: 0.0315,
					Apr: 0.0018,
					May: -0.0121,
					Jun: -0.0196,
					Jul: 0.0051,
					Aug: 0.0073,
					Sep: -0.0153,
					Oct: -0.0185,
					Nov: 0.0297,
					Dec: 0.0268
				},
				2022: {
					Jan: -0.0112,
					Feb: -0.0121,
					Mar: -0.0377,
					Apr: -0.0148,
					May: -0.009,
					Jun: -0.0151,
					Jul: 0.0335,
					Aug: -0.0255,
					Sep: -0.0137,
					Oct: 0.0092,
					Nov: 0.0153,
					Dec: -0.0207
				},
				2021: {
					Jan: -0.0045,
					Feb: -0.0359,
					Mar: 0.0078,
					Apr: 0.0053,
					May: 0.0023,
					Jun: 0.0068,
					Jul: 0.0177,
					Aug: 0.0006,
					Sep: -0.0153,
					Oct: -0.0358,
					Nov: 0.0208,
					Dec: 0.0016
				},
				2020: {
					Jan: 0.0233,
					Feb: 0.0085,
					Mar: -0.0018,
					Apr: -0.0016,
					May: 0.0028,
					Jun: 0.0029,
					Jul: 0.0037,
					Aug: -0.0045,
					Sep: 0.0107,
					Oct: 0.0027,
					Nov: -0.0014,
					Dec: -0.0026
				},
				2019: {
					Jan: 0.0062,
					Feb: 0.0093,
					Mar: 0.0181,
					Apr: 0.0026,
					May: 0.0171,
					Jun: 0.0103,
					Jul: 0.0092,
					Aug: 0.0151,
					Sep: -0.0051,
					Oct: -0.005,
					Nov: 0.008,
					Dec: -0.0167
				},
				2018: {
					Jan: -0.0029,
					Feb: 0.0028,
					Mar: 0.0085,
					Apr: -0.0039,
					May: 0.0068,
					Jun: 0.0045,
					Jul: 0.0014,
					Aug: 0.008,
					Sep: -0.0044,
					Oct: 0.0046,
					Nov: 0.0024,
					Dec: 0.0149
				},
				2017: {
					Jan: 0.0058,
					Feb: 0.0018,
					Mar: 0.0044,
					Apr: 0.0074,
					May: 0.0113,
					Jun: -0.0091,
					Jul: 0.0025,
					Aug: -0.0002,
					Sep: -0.0032,
					Oct: 0.0109,
					Nov: 0.0086,
					Dec: -0.0054
				},
				2016: {
					Jan: 0.0122,
					Feb: 0.0102,
					Mar: -0.0022,
					Apr: 0.0023,
					May: 0.0124,
					Jun: 0.0131,
					Jul: 0.0074,
					Aug: 0.004,
					Sep: -0.0023,
					Oct: -0.0129,
					Nov: -0.0145,
					Dec: -0.0019
				},
				2015: {
					Jan: 0.0159,
					Feb: 0.0027,
					Mar: 0.0075,
					Apr: -0.0112,
					May: 0.0003,
					Jun: -0.0093,
					Jul: 0.0127,
					Aug: 0.0063,
					Sep: 0.0024,
					Oct: 0.0029,
					Nov: -0.0089,
					Dec: 0.003
				},
				2014: {
					Jan: 0.0108,
					Feb: 0.0033,
					Mar: 0.0001,
					Apr: 0.0089,
					May: 0.0135,
					Jun: 0.0079,
					Jul: 0.0028,
					Aug: 0.01,
					Sep: -0.0035,
					Oct: 0.0095,
					Nov: 0.0124,
					Dec: 0.0167
				},
				2013: {
					Jan: -0.0023,
					Feb: 0.0058,
					Mar: -0.0024,
					Apr: 0.0155,
					May: -0.0008,
					Jun: -0.0108,
					Jul: 0.0086,
					Aug: -0.0033,
					Sep: 0.0049,
					Oct: -0.0006,
					Nov: -0.0011,
					Dec: 0.0051
				},
				2012: {
					Nov: 0.0001,
					Dec: 0.0015
				}
			}
		}
	},

	VIF: {
		symbol: 'VIF',
		name: 'Vanguard International Fixed Interest Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 0,
			ausFixedInterest: 0,
			intFixedInterest: 1.0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.002, // 0.20%
		provider: 'Vanguard',
		benchmark: 'Bloomberg Global Aggregate Float Adjusted and Scaled Index (AUD hedged)',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: -0.0109,
					distribution: 0.0175,
					total: 0.0067,
					grossReturn: 0.0087,
					benchmark: 0.0087
				},
				2023: {
					growth: 0.0304,
					distribution: 0.0162,
					total: 0.0466,
					grossReturn: 0.0487,
					benchmark: 0.0478
				},
				2022: {
					growth: -0.1423,
					distribution: 0.0136,
					total: -0.1287,
					grossReturn: -0.1269,
					benchmark: -0.1276
				},
				2021: {
					growth: -0.0923,
					distribution: 0.0682,
					total: -0.0241,
					grossReturn: -0.0221,
					benchmark: -0.0226
				},
				2020: {
					growth: -0.0317,
					distribution: 0.0799,
					total: 0.0482,
					grossReturn: 0.0503,
					benchmark: 0.0503
				},
				2019: {
					growth: 0.0479,
					distribution: 0.0131,
					total: 0.0609,
					grossReturn: 0.0631,
					benchmark: null // No benchmark data for 2019
				},
				2018: {
					growth: -0.0045,
					distribution: 0.0297,
					total: 0.0253,
					grossReturn: 0.0273,
					benchmark: 0.0273
				},
				2017: {
					growth: -0.071,
					distribution: 0.0966,
					total: 0.0256,
					grossReturn: 0.0277,
					benchmark: 0.028
				},
				2016: {
					growth: 0.0292,
					distribution: 0.0201,
					total: 0.0494,
					grossReturn: 0.0515,
					benchmark: 0.0518
				}
			},
			monthly: {
				2025: {
					Jan: 0.0025,
					Feb: 0.0111,
					Mar: -0.0056,
					Apr: 0.0117,
					May: -0.0062,
					Jun: 0.0072,
					Jul: -0.0034
				},
				2024: {
					Jan: -0.0054,
					Feb: -0.0079,
					Mar: 0.0064,
					Apr: -0.0177,
					May: 0.0035,
					Jun: 0.0071,
					Jul: 0.018,
					Aug: 0.0097,
					Sep: 0.0098,
					Oct: -0.0154,
					Nov: 0.011,
					Dec: -0.0116
				},
				2023: {
					Jan: 0.0187,
					Feb: -0.0156,
					Mar: 0.025,
					Apr: 0.0019,
					May: -0.0056,
					Jun: -0.0026,
					Jul: -0.004,
					Aug: -0.0033,
					Sep: -0.0182,
					Oct: -0.0077,
					Nov: 0.0301,
					Dec: 0.0287
				},
				2022: {
					Jan: -0.0157,
					Feb: -0.0104,
					Mar: -0.0218,
					Apr: -0.0253,
					May: -0.0072,
					Jun: -0.0125,
					Jul: 0.0216,
					Aug: -0.0288,
					Sep: -0.0318,
					Oct: -0.0024,
					Nov: 0.019,
					Dec: -0.0201
				},
				2021: {
					Jan: -0.0075,
					Feb: -0.0206,
					Mar: -0.0017,
					Apr: 0.0002,
					May: 0.0011,
					Jun: 0.0048,
					Jul: 0.0139,
					Aug: -0.0029,
					Sep: -0.0122,
					Oct: -0.0026,
					Nov: 0.0116,
					Dec: -0.0081
				},
				2020: {
					Jan: 0.0201,
					Feb: 0.0146,
					Mar: -0.002,
					Apr: 0.0069,
					May: -0.0007,
					Jun: 0.0015,
					Jul: 0.008,
					Aug: -0.0097,
					Sep: 0.0071,
					Oct: -0.0008,
					Nov: 0.0012,
					Dec: 0.0013
				},
				2019: {
					Jan: 0.0074,
					Feb: -0.0007,
					Mar: 0.017,
					Apr: -0.0024,
					May: 0.0158,
					Jun: 0.0123,
					Jul: 0.0072,
					Aug: 0.0261,
					Sep: -0.0067,
					Oct: -0.0057,
					Nov: -0.0046,
					Dec: -0.0058
				},
				2018: {
					Jan: -0.0065,
					Feb: 0.0008,
					Mar: 0.0113,
					Apr: -0.0037,
					May: 0.0026,
					Jun: 0.0031,
					Jul: -0.002,
					Aug: 0.001,
					Sep: -0.004,
					Oct: 0.0007,
					Nov: 0.0063,
					Dec: 0.0155
				},
				2017: {
					Jan: -0.0059,
					Feb: 0.0088,
					Mar: -0.0003,
					Apr: 0.0066,
					May: 0.0048,
					Jun: -0.0031,
					Jul: 0.0022,
					Aug: 0.0103,
					Sep: -0.006,
					Oct: 0.0042,
					Nov: 0.003,
					Dec: 0.0011
				},
				2016: {
					Jan: 0.021,
					Feb: 0.0144,
					Mar: 0.0064,
					Apr: 0.0,
					May: 0.0069,
					Jun: 0.0232,
					Jul: 0.0035,
					Aug: -0.002,
					Sep: 0.0002,
					Oct: -0.0118,
					Nov: -0.0155,
					Dec: 0.0026
				}
			}
		}
	},

	VISM: {
		symbol: 'VISM',
		name: 'Vanguard International Small Companies Index ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0, // International small cap equities
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0032, // 0.32%
		provider: 'Vanguard',
		benchmark: 'MSCI World ex-Australia Small Cap Index',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.1624,
					distribution: 0.0327,
					total: 0.1951,
					grossReturn: 0.1989,
					benchmark: 0.1957
				},
				2023: {
					growth: 0.1167,
					distribution: 0.0387,
					total: 0.1554,
					grossReturn: 0.1591,
					benchmark: 0.1538
				},
				2022: {
					growth: -0.1741,
					distribution: 0.0463,
					total: -0.1279,
					grossReturn: -0.1251,
					benchmark: -0.1292
				},
				2021: {
					growth: 0.167,
					distribution: 0.0609,
					total: 0.2279,
					grossReturn: 0.2319,
					benchmark: 0.2289
				},
				2020: {
					growth: 0.0037,
					distribution: 0.0473,
					total: 0.051,
					grossReturn: 0.0544,
					benchmark: 0.0536
				},
				2019: {
					growth: 0.2061,
					distribution: 0.057,
					total: 0.2632,
					grossReturn: 0.2672,
					benchmark: 0.2653
				}
			},
			monthly: {
				2025: {
					Jan: 0.0258,
					Feb: -0.0301,
					Mar: -0.0396,
					Apr: -0.0207,
					May: 0.0515,
					Jun: 0.0293,
					Jul: 0.0296
				},
				2024: {
					Jan: 0.0039,
					Feb: 0.0498,
					Mar: 0.0368,
					Apr: -0.0479,
					May: 0.0213,
					Jun: -0.0238,
					Jul: 0.0943,
					Aug: -0.0339,
					Sep: -0.0055,
					Oct: 0.0322,
					Nov: 0.0722,
					Dec: -0.0098
				},
				2023: {
					Jan: 0.0519,
					Feb: 0.0258,
					Mar: -0.0188,
					Apr: 0.012,
					May: -0.0065,
					Jun: 0.0345,
					Jul: 0.0364,
					Aug: 0.0011,
					Sep: -0.0492,
					Oct: -0.0428,
					Nov: 0.0433,
					Dec: 0.065
				},
				2022: {
					Jan: -0.0442,
					Feb: -0.0281,
					Mar: -0.0275,
					Apr: -0.0261,
					May: -0.0097,
					Jun: -0.0579,
					Jul: 0.0742,
					Aug: -0.0173,
					Sep: -0.0414,
					Oct: 0.0873,
					Nov: 0.0122,
					Dec: -0.046
				},
				2021: {
					Jan: 0.0279,
					Feb: 0.0413,
					Mar: 0.0387,
					Apr: 0.0232,
					May: 0.0068,
					Jun: 0.033,
					Jul: 0.014,
					Aug: 0.0297,
					Sep: -0.0198,
					Oct: -0.004,
					Nov: 0.0079,
					Dec: 0.0103
				},
				2020: {
					Jan: 0.02,
					Feb: -0.056,
					Mar: -0.1633,
					Apr: 0.0569,
					May: 0.0536,
					Jun: -0.0118,
					Jul: -0.0036,
					Aug: 0.0235,
					Sep: 0.0107,
					Oct: 0.0205,
					Nov: 0.0999,
					Dec: 0.0246
				},
				2019: {
					Jan: 0.0647,
					Feb: 0.0631,
					Mar: -0.0051,
					Apr: 0.0408,
					May: -0.0514,
					Jun: 0.0454,
					Jul: 0.0228,
					Aug: -0.0115,
					Sep: 0.0199,
					Oct: 0.0062,
					Nov: 0.0521,
					Dec: -0.0044
				},
				2018: {
					Dec: -0.0591 // Inception 09 Nov 2018
				}
			}
		}
	},

	VGAD: {
		symbol: 'VGAD',
		name: 'Vanguard MSCI Index International Shares (Hedged) ETF',
		assetAllocation: {
			ausEquities: 0,
			intEquities: 1.0, // International equities (AUD hedged)
			ausFixedInterest: 0,
			intFixedInterest: 0,
			cash: 0,
			alternatives: 0
		},
		managementCost: 0.0021, // 0.21%
		provider: 'Vanguard',
		benchmark: 'MSCI World ex-Australia Index (AUD hedged)',
		domicile: 'Australia',
		returns: {
			annual: {
				2024: {
					growth: 0.1384,
					distribution: 0.0678,
					total: 0.2062,
					grossReturn: 0.2088,
					benchmark: 0.2066
				},
				2023: {
					growth: 0.217,
					distribution: 0.0,
					total: 0.217,
					grossReturn: 0.2195,
					benchmark: 0.2166
				},
				2022: {
					growth: -0.1795,
					distribution: 0.0,
					total: -0.1795,
					grossReturn: -0.1778,
					benchmark: -0.1806
				},
				2021: {
					growth: 0.151,
					distribution: 0.0881,
					total: 0.2391,
					grossReturn: 0.2417,
					benchmark: 0.2388
				},
				2020: {
					growth: 0.0655,
					distribution: 0.0406,
					total: 0.106,
					grossReturn: 0.1084,
					benchmark: 0.1057
				},
				2019: {
					growth: 0.2703,
					distribution: 0.0, // Shown as "—" in data
					total: 0.2703,
					grossReturn: 0.273,
					benchmark: 0.2681
				},
				2018: {
					growth: -0.0852,
					distribution: 0.0097,
					total: -0.0755,
					grossReturn: -0.0735,
					benchmark: -0.0758
				},
				2017: {
					growth: 0.1393,
					distribution: 0.0605,
					total: 0.1998,
					grossReturn: 0.2023,
					benchmark: 0.2002
				},
				2016: {
					growth: 0.0879,
					distribution: 0.0152,
					total: 0.1031,
					grossReturn: 0.1054,
					benchmark: 0.1034
				},
				2015: {
					growth: 0.0366,
					distribution: 0.0, // Shown as "—" in data
					total: 0.0366,
					grossReturn: 0.0388,
					benchmark: 0.0383
				}
			},
			monthly: {
				2025: {
					Jan: 0.0345,
					Feb: -0.0088,
					Mar: -0.0502,
					Apr: -0.0043,
					May: 0.0596,
					Jun: 0.0377,
					Jul: 0.0206
				},
				2024: {
					Jan: 0.0177,
					Feb: 0.0468,
					Mar: 0.0336,
					Apr: -0.0326,
					May: 0.0406,
					Jun: 0.0229,
					Jul: 0.012,
					Aug: 0.0174,
					Sep: 0.0141,
					Oct: -0.0096,
					Nov: 0.0492,
					Dec: -0.0195
				},
				2023: {
					Jan: 0.0622,
					Feb: -0.0163,
					Mar: 0.0254,
					Apr: 0.0164,
					May: -0.002,
					Jun: 0.0558,
					Jul: 0.0283,
					Aug: -0.0188,
					Sep: -0.0376,
					Oct: -0.0272,
					Nov: 0.0801,
					Dec: 0.0394
				},
				2022: {
					Jan: -0.0506,
					Feb: -0.0273,
					Mar: 0.029,
					Apr: -0.0745,
					May: -0.0017,
					Jun: -0.0809,
					Jul: 0.0796,
					Aug: -0.0357,
					Sep: -0.0889,
					Oct: 0.0722,
					Nov: 0.0545,
					Dec: -0.0519
				},
				2021: {
					Jan: -0.0085,
					Feb: 0.0267,
					Mar: 0.0429,
					Apr: 0.04,
					May: 0.0101,
					Jun: 0.0238,
					Jul: 0.0175,
					Aug: 0.0269,
					Sep: -0.0375,
					Oct: 0.0541,
					Nov: -0.0155,
					Dec: 0.0399
				},
				2020: {
					Jan: -0.0042,
					Feb: -0.0838,
					Mar: -0.1346,
					Apr: 0.1002,
					May: 0.0471,
					Jun: 0.023,
					Jul: 0.0329,
					Aug: 0.0614,
					Sep: -0.0295,
					Oct: -0.0319,
					Nov: 0.1156,
					Dec: 0.0345
				},
				2019: {
					Jan: 0.0713,
					Feb: 0.0342,
					Mar: 0.0168,
					Apr: 0.0387,
					May: -0.0593,
					Jun: 0.059,
					Jul: 0.0114,
					Aug: -0.0206,
					Sep: 0.0234,
					Oct: 0.0185,
					Nov: 0.0318,
					Dec: 0.023
				},
				2018: {
					Jan: 0.0381,
					Feb: -0.0371,
					Mar: -0.0224,
					Apr: 0.0198,
					May: 0.0134,
					Jun: 0.003,
					Jul: 0.0322,
					Aug: 0.0145,
					Sep: 0.0085,
					Oct: -0.0687,
					Nov: 0.012,
					Dec: -0.083
				},
				2017: {
					Jan: 0.014,
					Feb: 0.0315,
					Mar: 0.0104,
					Apr: 0.0124,
					May: 0.0179,
					Jun: 0.0011,
					Jul: 0.0149,
					Aug: 0.0025,
					Sep: 0.0249,
					Oct: 0.0264,
					Nov: 0.0167,
					Dec: 0.0112
				},
				2016: {
					Jan: -0.054,
					Feb: -0.0139,
					Mar: 0.052,
					Apr: 0.0091,
					May: 0.0196,
					Jun: -0.0113,
					Jul: 0.0407,
					Aug: 0.0065,
					Sep: 0.0028,
					Oct: -0.0052,
					Nov: 0.0279,
					Dec: 0.0287
				},
				2015: {
					Jan: -0.0056,
					Feb: 0.0597,
					Mar: -0.0025,
					Apr: 0.0127,
					May: 0.0146,
					Jun: -0.0277,
					Jul: 0.0274,
					Aug: -0.0662,
					Sep: -0.0345,
					Oct: 0.0799,
					Nov: 0.0081,
					Dec: -0.021
				}
			}
		}
	}
};

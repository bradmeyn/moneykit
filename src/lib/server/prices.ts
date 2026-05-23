/**
 * Stock price fetching utility using Yahoo Finance API
 * Prices are returned in cents for consistency with the rest of the app
 */

interface YahooChartResponse {
	chart: {
		result: Array<{
			meta: {
				regularMarketPrice: number;
				currency: string;
			};
		}> | null;
		error: {
			code: string;
			description: string;
		} | null;
	};
}

interface CachedPrice {
	price: number | null;
	timestamp: number;
}

// In-memory cache for stock prices
const priceCache = new Map<string, CachedPrice>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Check if cached price is still valid (less than 24 hours old)
 */
function isCacheValid(cached: CachedPrice | undefined): boolean {
	if (!cached) return false;
	const now = Date.now();
	return now - cached.timestamp < CACHE_DURATION;
}

/**
 * Fetch current stock price from Yahoo Finance
 * @param code - Stock code (e.g., 'VAS', 'AAPL')
 * @param exchange - Exchange suffix (default 'AX' for ASX)
 * @returns Price in cents, or null if not found
 */
export async function getStockPrice(code: string, exchange: string = 'AX'): Promise<number | null> {
	// Build the symbol for cache key
	const symbol = exchange ? `${code}.${exchange}` : code;

	// Check cache first
	const cached = priceCache.get(symbol);
	if (isCacheValid(cached)) {
		return cached!.price;
	}

	try {
		const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;

		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; PortfolioPro/1.0)'
			}
		});

		if (!response.ok) {
			console.error(`Failed to fetch price for ${symbol}: ${response.status}`);
			return null;
		}

		const data: YahooChartResponse = await response.json();

		if (data.chart.error || !data.chart.result?.[0]) {
			console.error(`No data for ${symbol}:`, data.chart.error?.description);
			return null;
		}

		const price = data.chart.result[0].meta.regularMarketPrice;
		const priceInCents = Math.round(price * 100);

		// Cache the result
		priceCache.set(symbol, {
			price: priceInCents,
			timestamp: Date.now()
		});

		return priceInCents;
	} catch (error) {
		console.error(`Error fetching price for ${code}:`, error);
		return null;
	}
}

/**
 * Fetch prices for multiple stocks in parallel
 * @param codes - Array of stock codes
 * @param exchange - Exchange suffix (default 'AX' for ASX)
 * @returns Map of code to price in cents
 */
export async function getStockPrices(
	codes: string[],
	exchange: string = 'AX'
): Promise<Map<string, number | null>> {
	const prices = new Map<string, number | null>();

	// Fetch all prices in parallel
	const results = await Promise.all(codes.map((code) => getStockPrice(code, exchange)));

	codes.forEach((code, index) => {
		prices.set(code, results[index]);
	});

	return prices;
}

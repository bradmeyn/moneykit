import { writable, derived } from 'svelte/store';
import { INVESTMENTS } from '$lib/constants';
import type { Holding } from '$lib/types';

type Portfolio = {
	value: number;
	holdings: Holding[];
};

const initialPortfolio = {
	value: 100000,
	holdings: [
		{
			investment: INVESTMENTS[0],
			allocation: 0.5,
			value: 50000
		},
		{
			investment: INVESTMENTS[1],
			allocation: 0.2,
			value: 20000
		},
		{
			investment: INVESTMENTS[2],
			allocation: 0.3,
			value: 30000
		}
	]
};

export const portfolio = writable<Portfolio>(initialPortfolio);

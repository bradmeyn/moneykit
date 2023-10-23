// scenariosStore.ts
import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

export interface Scenario {
	id: string;
	inputs: {
		startingValue: number;
		contributionValue: number;
		interestValue: number;
		frequency: number;
		yearsValue: number;
	};
	// outcomes: {
	// 	totalContributions: number;
	// 	totalInterest: number;
	// 	totalValue: number;
	// 	chartYears: number[];
	// 	chartContributions: number[];
	// 	chartInterest: number[];
	// 	chartTotal: number[];
	// };
}

const initialScenarios: Scenario[] = [
	{
		id: nanoid(),
		inputs: {
			startingValue: 0,
			contributionValue: 0,
			interestValue: 0,
			frequency: 52,
			yearsValue: 10
		}
	}
];

export const addScenario = () => {
	const newScenario: Scenario = {
		id: nanoid(),
		inputs: {
			startingValue: 0,
			contributionValue: 0,
			interestValue: 0,
			frequency: 52,
			yearsValue: 10
		}
	};
	scenarios.update((scenarios) => [...scenarios, newScenario]);
};

export const scenarios = writable<Scenario[]>(initialScenarios);

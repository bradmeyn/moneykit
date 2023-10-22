// scenariosStore.ts
import { writable, derived } from 'svelte/store';
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
	outcomes: {
		totalContributions: number;
		totalInterest: number;
		totalValue: number;
		chartYears: number[];
		chartContributions: number[];
		chartInterest: number[];
		chartTotal: number[];
	};
}

const initialScenarios: Scenario[] = [
	{
		id: nanoid(),
		inputs: {
			startingValue: 100000,
			contributionValue: 1000,
			interestValue: 6,
			frequency: 52,
			yearsValue: 10
		},
		outcomes: {
			totalContributions: 520000,
			totalInterest: 324000,
			totalValue: 844000,
			chartYears: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			chartContributions: [
				52000, 104000, 156000, 208000, 260000, 312000, 364000, 416000, 468000, 520000
			],
			chartInterest: [3120, 9360, 18720, 31200, 46800, 65520, 87480, 112320, 140400, 172800],
			chartTotal: [55120, 113360, 174720, 239200, 326800, 377520, 451480, 528320, 608400, 692800]
		}
	}
];

export const scenarios = writable<Scenario[]>(initialScenarios);

// Derived store for scenario totals
export const scenarioTotals = derived(scenarios, ($scenarios) =>
	$scenarios.map((scenario) => {
		const { startingValue, contributionValue, interestValue, frequency, yearsValue } =
			scenario.inputs;

		const totalContributions = contributionValue * frequency * yearsValue;
		let totalValue = startingValue;
		let totalInterest = 0;

		const chartYears = Array.from({ length: yearsValue }, (_, i) => i + 1);
		const chartContributions: number[] = [];
		const chartInterest: number[] = [];
		const chartTotal: number[] = [];

		console.log(chartYears, chartContributions, chartInterest, chartTotal);

		for (let i = 1; i <= yearsValue; i++) {
			const interest = totalValue * (interestValue / 100);
			totalValue += interest;
			totalValue += contributionValue * frequency;
			totalInterest += interest;

			chartContributions.push(contributionValue * frequency * i);
			chartInterest.push(totalInterest);
			chartTotal.push(totalValue);
		}

		console.log(chartYears, chartContributions, chartInterest, chartTotal);

		return {
			...scenario,
			outcomes: {
				totalContributions,
				totalInterest,
				totalValue,
				chartYears,
				chartContributions,
				chartInterest,
				chartTotal
			}
		};
	})
);

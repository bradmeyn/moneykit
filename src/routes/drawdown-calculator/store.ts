import { calculateDrawdown } from './helpers';
import { writable, derived, type Readable } from 'svelte/store';
import { type Scenario, type Result } from './types';

// Store for input scenarios
export const scenarios = writable<Scenario[]>([
	{
		id: 1,
		startingAmount: 100000,
		drawdown: 1000,
		interestRate: 0.06
	}
]);
// Derived store for calculated results
export const results: Readable<Result[]> = derived(scenarios, ($scenarios) => {
	return $scenarios.map((scenario) => {
		const result = calculateDrawdown(
			scenario.startingAmount,
			scenario.interestRate,
			scenario.drawdown
		);

		return {
			id: scenario.id,
			...result
		};
	});
});
// Function to add a new scenario
export function addScenario() {
	scenarios.update((currentScenarios) => [
		...currentScenarios,
		{
			id: currentScenarios.length + 1,
			startingAmount: currentScenarios[currentScenarios.length - 1].startingAmount,
			drawdown: currentScenarios[currentScenarios.length - 1].drawdown,
			interestRate: currentScenarios[currentScenarios.length - 1].interestRate
		}
	]);
}

import { calculateCompoundInterest } from './helpers';
import { writable, derived, type Readable } from 'svelte/store';
import { type Scenario, type Result } from './types';

// Store for input scenarios
export const scenarios = writable<Scenario[]>([
	{
		id: 1,
		principal: 100000,
		contributionAmount: 1000,
		interestRate: 6,
		contributionFrequency: 52,
		years: 10
	}
]);
// Derived store for calculated results
export const results: Readable<Result[]> = derived(scenarios, ($scenarios) => {
	return $scenarios.map((scenario) => {
		const result = calculateCompoundInterest(
			scenario.principal,
			scenario.interestRate,
			scenario.years,
			scenario.contributionAmount,
			scenario.contributionFrequency
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
			principal: currentScenarios[currentScenarios.length - 1].principal,
			contributionAmount: currentScenarios[currentScenarios.length - 1].contributionAmount,
			interestRate: currentScenarios[currentScenarios.length - 1].interestRate,
			contributionFrequency: currentScenarios[currentScenarios.length - 1].contributionFrequency,
			years: currentScenarios[currentScenarios.length - 1].years
		}
	]);
}

// // Function to update a scenario
// export function updateScenario(id, updates) {
// 	scenarios.update((currentScenarios) =>
// 		currentScenarios.map((scenario) =>
// 			scenario.id === id ? { ...scenario, ...updates } : scenario
// 		)
// 	);
// }

// // Function to remove a scenario
// export function removeScenario(id) {
// 	scenarios.update((currentScenarios) => currentScenarios.filter((scenario) => scenario.id !== id));
// }

import { writable, derived, type Readable } from 'svelte/store';
import { type Scenario, type Result } from './types';
import { calculatePersonalTax } from './taxRates';

// Store for input scenarios
export const scenarios = writable<Scenario[]>([
	{
		id: 1,
		income: 100000,
		deductions: 0,
		hasInsurance: false,
		hasHelpDebt: false
	}
]);

// Derived store for calculated results
export const results: Readable<Result[]> = derived(scenarios, ($scenarios) => {
	return $scenarios.map((scenario) => {
		const result = calculatePersonalTax(
			scenario.income,
			scenario.deductions,
			scenario.hasInsurance,
			scenario.hasHelpDebt
		);

		return {
			id: scenario.id,

			...result
		};
	});
});

export function addScenario() {
	scenarios.update((currentScenarios) => [
		...currentScenarios,
		{
			id: currentScenarios.length + 1,
			income: currentScenarios[currentScenarios.length - 1].income,
			deductions: currentScenarios[currentScenarios.length - 1].deductions,
			hasInsurance: currentScenarios[currentScenarios.length - 1].hasInsurance,
			hasHelpDebt: currentScenarios[currentScenarios.length - 1].hasHelpDebt
		}
	]);
}

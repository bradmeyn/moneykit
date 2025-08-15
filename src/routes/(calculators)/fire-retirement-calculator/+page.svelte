<script lang="ts">
	import { setCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import FireView from './_components/fire/fire-view.svelte';
	import RetirementView from './_components/retirement-view.svelte';

	const calc = setCalculatorState();
</script>

<svelte:head>
	<title>Retirement Projection</title>
</svelte:head>

<main class="container">
	<h1 class="mb-4 calculator-heading">Retirement Calculator</h1>
	<Tabs.Root value={calc.mode} onValueChange={(value) => (calc.mode = value)}>
		<Tabs.List class="mb-4 grid grid-cols-2 gap-2">
			<Tabs.Trigger value="fire">FIRE</Tabs.Trigger>
			<Tabs.Trigger value="traditional">Traditional</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>

	<Tabs.Root value={calc.mode} onValueChange={(value) => (calc.mode = value)}>
		<Tabs.Content value="fire">
			<FireView />
		</Tabs.Content>
		<Tabs.Content value="traditional">
			<RetirementView />
		</Tabs.Content>
	</Tabs.Root>
</main>

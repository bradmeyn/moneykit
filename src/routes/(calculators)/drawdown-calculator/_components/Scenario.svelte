<script lang="ts">
	import Inputs from './Inputs.svelte';
	import Chart from './Chart.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Table from './Table.svelte';
	import type { Result, Scenario } from '../types';

	interface Props {
		scenario: Scenario;
		result: Result;
	}

	let { scenario = $bindable(), result }: Props = $props();

	let options = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = $state('chart');
</script>

<section class="flex flex-col lg:flex-row gap-8">
	<aside class="max-w-[1000px] min-w-[300px]">
		<Inputs
			bind:startingAmount={scenario.startingAmount}
			bind:drawdown={scenario.drawdown}
			bind:interestRate={scenario.interestRate}
		/>
	</aside>
	<div class="w-full card">
		<div class="w-full">
			<div class="flex flex-col md:flex-row gap-4 justify-between mb-3">
				<div>
					<p class="text-sm font-semibold text-primary-light">Drawdown duration</p>

					{#if result.yearsLasted === 50}
						<p class="font-semibold text-2xl md:text-2xl">Over 50 years</p>
					{:else}
						<p class="font-semibold text-2xl md:text-2xl">{result.yearsLasted} years</p>
					{/if}
				</div>
				<Tabs {options} bind:selectedView />
			</div>
			{#if selectedView === 'chart'}
				<Chart data={result.annualData} />
				<div class="md:max-w-xs">
					<!-- <LegendList
						formatter={formatAsCurrency}
						data={[
							{ label: 'Principle', value: result.annualData[0].startingValue },
							{ label: 'Contributions', value: result.totalWithdrawn },
							{ label: 'Interest', value: result.totalInterest }
						]}
					/> -->
				</div>
			{:else if selectedView === 'table'}
				<Table annualData={result.annualData} />
			{/if}
		</div>
	</div>
</section>

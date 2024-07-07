<script lang="ts">
	import Inputs from './_components/Inputs.svelte';
	import Chart from './_components/Chart.svelte';
	import { calculateCompoundInterest } from '$lib/utils/formatters';
	import ViewToggle from '$lib/components/ui/ViewToggle.svelte';
	import Table from './_components/Table.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';

	// Inputs
	let principal: number = 100000;
	let contributionAmount: number = 1000;
	let interestRate: number = 6;
	let contributionFrequency: number = 52;
	let years: number = 10;

	// Results
	let totalContributions: number = 0;
	let totalInterest: number = 0;
	let totalValue: number = 0;

	// Chart
	let chartYears: number[] = [];
	let contributionsByYear: number[] = [];
	let interestByYear: number[] = [];
	let startingByYear: number[] = [];

	let options = [
		{ label: 'Chart', value: 'chart' },
		{ label: 'Table', value: 'table' }
	];
	let selectedView = 'chart';

	$: {
		const results = calculateCompoundInterest(
			principal,
			interestRate,
			years,
			contributionAmount,
			contributionFrequency
		);

		totalValue = results.totalValue;
		totalContributions = results.totalContributions;
		totalInterest = results.totalInterest;
		chartYears = results.chartYears;
		contributionsByYear = results.contributionsByYear;
		interestByYear = results.interestByYear;
		startingByYear = results.startingByYear;
	}
</script>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1>Growth Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<aside class="max-w-[1000px] min-w-[300px]">
			<Inputs
				bind:principal
				bind:contributionAmount
				bind:interestRate
				bind:contributionFrequency
				bind:years
			/>
		</aside>

		<div class="w-full">
			<Card classes="p-3 mb-2 w-full relative ">
				<div class="flex justify-between mb-3">
					<div>
						<p class="text-sm font-semibold text-brand-light">Total Value</p>
						<p class="font-semibold text-2xl md:text-2xl">
							{formatAsCurrency(totalValue, false)}
						</p>
					</div>
					<ViewToggle {options} bind:selectedView />
				</div>
				{#if selectedView === 'chart'}
					<Chart bind:chartYears bind:contributionsByYear bind:interestByYear bind:startingByYear />
				{:else if selectedView === 'table'}
					<Table bind:chartYears bind:contributionsByYear bind:interestByYear bind:principal />
				{/if}
			</Card>
		</div>
	</section>
</main>

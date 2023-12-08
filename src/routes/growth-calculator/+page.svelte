<script lang="ts">
	import Sidebar from '$lib/components/growth-calculator/Sidebar.svelte';
	import Results from '$lib/components/growth-calculator/Results.svelte';
	import Chart from '$lib/components/growth-calculator/Chart.svelte';
	import { calculateCompoundInterest } from '$lib/utils';
	import Toggle from '$lib/components/growth-calculator/Toggle.svelte';
	import Table from '$lib/components/growth-calculator/Table.svelte';

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

	let showingChart: boolean = true;

	// Chart
	let chartYears: number[] = [];
	let contributionsByYear: number[] = [];
	let interestByYear: number[] = [];
	let startingByYear: number[] = [];

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

<main class="flex flex-col flex-1 container mx-auto dark:text-white text-slate-700">
	<h1 class="text-3xl font-bold p-3">Investment Growth Calculator</h1>

	<section class="md:flex">
		<Sidebar
			bind:principal
			bind:contributionAmount
			bind:interestRate
			bind:contributionFrequency
			bind:years
		/>

		<div class="w-full p-3">
			<Results bind:principal bind:totalContributions bind:totalInterest bind:totalValue />

			<Toggle bind:showingChart />

			<div class="flex justify-end">
				{#if showingChart}
					<Chart bind:chartYears bind:contributionsByYear bind:interestByYear bind:startingByYear />
				{:else}
					<Table bind:chartYears bind:contributionsByYear bind:interestByYear bind:principal />
				{/if}
			</div>
		</div>
	</section>
</main>

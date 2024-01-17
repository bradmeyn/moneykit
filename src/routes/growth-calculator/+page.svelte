<script lang="ts">
	import Inputs from './_components/Inputs.svelte';
	import Results from './_components/Results.svelte';
	import Chart from './_components/Chart.svelte';
	import { calculateCompoundInterest } from '$lib/utils';
	import Toggle from './_components/Toggle.svelte';
	import Table from './_components/Table.svelte';

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
	let isChartView: boolean = true;

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

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="text-3xl font-light p-3">Growth Calculator</h1>

	<section class="md:flex gap-5">
		<Inputs
			bind:principal
			bind:contributionAmount
			bind:interestRate
			bind:contributionFrequency
			bind:years
		/>

		<div class="w-full p-3">
			<Results bind:principal bind:totalContributions bind:totalInterest bind:totalValue />
			<Toggle bind:isChartView />
			<div class="flex justify-end">
				{#if isChartView}
					<Chart bind:chartYears bind:contributionsByYear bind:interestByYear bind:startingByYear />
				{:else}
					<Table bind:chartYears bind:contributionsByYear bind:interestByYear bind:principal />
				{/if}
			</div>
		</div>
	</section>
</main>

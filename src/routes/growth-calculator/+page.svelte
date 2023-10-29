<script lang="ts">
	import Sidebar from '$lib/components/growth-calculator/Sidebar.svelte';
	import Results from '$lib/components/growth-calculator/Results.svelte';
	import Chart from '$lib/components/growth-calculator/Chart.svelte';

	import { calculateCompoundInterest } from '$lib/utils';

	// Inputs
	let startingValue: number = 100000;
	let contributionValue: number = 1000;
	let interestValue: number = 6;
	let frequency: number = 52;
	let yearsValue: number = 10;

	// Results
	let totalContributions: number = 0;
	let totalInterest: number = 0;
	let totalValue: number = 0;

	// Chart
	let chartYears: number[] = [];
	let contributionsByYear: number[] = [];
	let interestByYear: number[] = [];
	let startingByYear: number[] = [];

	$: {
		const {
			totalValue,
			totalContributions,
			totalInterest,
			chartYears,
			contributionsByYear,
			interestByYear,
			startingByYear
		} = calculateCompoundInterest(
			startingValue,
			contributionValue,
			interestValue,
			frequency,
			yearsValue
		);
	}
</script>

<main class="flex flex-col flex-1 container mx-auto border border-sky-800">
	<h1 class="text-3xl font-bold p-3">Investment Growth Calculator</h1>

	<section class="md:flex">
		<Sidebar
			bind:startingValue
			bind:contributionValue
			bind:interestValue
			bind:frequency
			bind:yearsValue
		/>

		<div class="w-full p-3">
			<Results bind:startingValue bind:totalContributions bind:totalInterest bind:totalValue />
			<Chart bind:startingByYear bind:chartYears bind:interestByYear bind:contributionsByYear />
		</div>
	</section>
</main>

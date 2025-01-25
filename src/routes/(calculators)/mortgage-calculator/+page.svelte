<script lang="ts">
	import { getCalculatorState, setCalculatorState } from './calculator.svelte';

	import Inputs from './_components/Inputs.svelte';
	import MortgageChart from './_components/MortgageChart.svelte';
	import { formatAsCurrency } from '$utils/formatters';

	setCalculatorState();
	let calc = getCalculatorState();
</script>

<svelte:head>
	<title>MoneyKit | Mortgage Calculator</title>
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Mortgage Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />

		<div class="w-full space-y-4">
			<div class="flex gap-4">
				<div class="card flex-1">
					<h2 class="card-heading">Repayments</h2>
					<p class="text-xl font-semibold">{formatAsCurrency(calc.projection.repayment)}</p>
				</div>
				<div class="card flex-1">
					<h2 class="card-heading">Total Repayments</h2>
					<p class="text-xl font-semibold">{formatAsCurrency(calc.projection.totalRepayment)}</p>
				</div>
				<div class="card flex-1">
					<h2 class="card-heading">Total Interest</h2>
					<p class="text-xl font-semibold">{formatAsCurrency(calc.projection.totalInterest)}</p>
				</div>
				{#if calc.offsetBalance > 0}
					<div class="card flex-1">
						<h2 class="card-heading">Interest Saved</h2>
						<p class="text-xl font-semibold">{formatAsCurrency(calc.projection.interestSaved)}</p>
					</div>
				{/if}
			</div>
			<div class="card">
				<MortgageChart />
			</div>
		</div>
	</section>
</main>

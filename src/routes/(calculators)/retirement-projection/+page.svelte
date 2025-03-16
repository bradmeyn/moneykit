<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Inputs from './_components/Inputs.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';

	setCalculatorState();
</script>

<svelte:head>
	<title>MoneyKit | Retirement Projection</title>
</svelte:head>

<main class="flex flex-col flex-1 container mx-auto text-white">
	<h1 class="mb-4">Retirement Calculator</h1>

	<section class="flex flex-col lg:flex-row gap-8">
		<Inputs />
		<div>
			<div class="grid grid-cols-3 gap-4">
				<div class="card">
					<p class="text-muted">Balance at Retirement</p>
					<p>$300,000</p>
				</div>
			</div>
			<div class="card w-full">
				<h2 class="card-heading mb-1">Outcome</h2>
			</div>
		</div>
	</section>
</main>

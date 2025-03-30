<script lang="ts">
	import { setCalculatorState, getCalculatorState } from './calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import Inputs from './_components/Inputs.svelte';
	import DownloadButton from '$lib/components/DownloadButton.svelte';
	import AssetChart from './_components/AssetChart.svelte';
	import IncomeChart from './_components/IncomeChart.svelte';
	import OutcomeCard from './_components/OutcomeCard.svelte';
	import ScrollableTable from '$ui/ScrollableTable.svelte';
	import {
		ThumbsUp,
		ThumbsDown,
		TrendingUp,
		TrendingDown,
		CheckCircle,
		AlertTriangle
	} from 'lucide-svelte';

	setCalculatorState();
	const calc = getCalculatorState();
	let outcomeView = $state('assets');

	const assetData = calc.getAssetTableData();
	const incomeData = calc.getIncomeTableData();
</script>

<svelte:head>
	<title>MoneyKit | Retirement Projection</title>
</svelte:head>

<main class="container mx-auto text-white">
	<h1 class="mb-4">Retirement Calculator</h1>

	<section class="flex gap-8">
		<div class="max-w-[1000px] min-w-[300px]">
			<Inputs />
		</div>
		<div class="flex-1 flex flex-col gap-2 w-full">
			<div class="grid grid-cols-3 gap-2">
				<div class="card h-fit">
					<h3 class="text-muted">Balance at Retirement (Age {calc.retirementAge})</h3>
					<div class="text-2xl font-semibold">
						{formatAsCurrency(calc.outcome.balanceAtRetirement)}
					</div>
				</div>
				<div class="card h-fit">
					<h3 class="text-muted">Superannuation Longevity</h3>
					<div class="text-2xl font-semibold">
						{calc.outcome.superLongevity} years
					</div>
				</div>

				<div class="card h-fit">
					<h3 class="text-muted">Retirement Goal</h3>
					<div class="text-2xl font-semibold flex items-center">
						{#if calc.outcome.sufficientFunding}
							<span class=" flex items-center gap-2">
								<CheckCircle class="text-green-500" size={24} />
								<span>Sufficient</span>
							</span>
						{:else}
							<span class=" flex items-center gap-2">
								<AlertTriangle class="text-orange-500" size={24} />
								<span>At Risk</span>
							</span>
						{/if}
					</div>
				</div>
			</div>
			<Tabs.Root value={outcomeView} onValueChange={(value) => (outcomeView = value)}>
				<Tabs.List
					class="w-full border-b border-ui-700 bg-transparent rounded-none flex justify-start p-0"
				>
					<Tabs.Trigger
						value="assets"
						class="bg-transparent px-4 py-2 data-[state=active]:border-b data-[state=active]:bg-transparent border-b-white rounded-none"
						>Assets</Tabs.Trigger
					>
					<Tabs.Trigger
						value="income"
						class="bg-transparent px-4 py-2 data-[state=active]:border-b data-[state=active]:bg-transparent border-b-white rounded-none"
						>Income</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Root>

			<div>
				<Tabs.Root value={outcomeView} onValueChange={(value) => (outcomeView = value)}>
					<Tabs.Content value="assets">
						<OutcomeCard title="Asset Projection">
							{#snippet chart()}
								<AssetChart />
							{/snippet}
							{#snippet table()}
								<ScrollableTable columns={assetData.columns} rows={assetData.rows} />
							{/snippet}
						</OutcomeCard>
					</Tabs.Content>
					<Tabs.Content value="income">
						<OutcomeCard title="Income Projection">
							{#snippet chart()}
								<IncomeChart />
							{/snippet}
							{#snippet table()}
								<ScrollableTable columns={incomeData.columns} rows={incomeData.rows} />
							{/snippet}
						</OutcomeCard>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>
</main>

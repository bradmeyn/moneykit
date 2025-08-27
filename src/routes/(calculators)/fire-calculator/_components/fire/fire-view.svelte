<script lang="ts">
	import FireInputs from './fire-inputs.svelte';
	import FireChart from './fire-chart.svelte';
	import FireTable from './fire-table.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { getCalculatorState } from '../../calculator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	const calc = getCalculatorState();
	let outcomeView = $state('chart');
</script>

<section class="flex flex-col lg:flex-row gap-8">
	<div class="max-w-[1000px] min-w-[300px]">
		<FireInputs />
	</div>
	<div class="card w-full">
		<div class="flex gap-2 flex-col md:flex-row md:justify-between w-full mb-2">
			<h2 class="card-heading">Outcome</h2>
			<Tabs.Root
				value={outcomeView}
				onValueChange={(value) => (outcomeView = value)}
				class="w-full md:w-fit"
			>
				<Tabs.List class="w-full min-w-48">
					<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
					<Tabs.Trigger value="table">Table</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</div>
		<div class="flex flex-col-reverse md:flex-row gap-4 justify-between items-start mb-3">
			<div class="grid grid-cols-2 gap-16">
				<div class="col-span-1">
					<h3 class="text-muted-foreground">FIRE Number</h3>
					<div class="text-2xl font-semibold">
						{formatAsCurrency(calc.fireNumber)}
					</div>
				</div>
				<div class="col-span-1">
					<h3 class="text-muted-foreground">FIRE Age</h3>
					<div class="text-2xl font-semibold">
						<span>{calc.yearsToFire + calc.age}</span>
						<span class="text-muted-foreground text-sm">({calc.yearsToFire} years)</span>
					</div>
				</div>
			</div>
		</div>
		<Tabs.Root value={outcomeView}>
			<Tabs.Content value="chart" class="m-0">
				<FireChart />
			</Tabs.Content>
			<Tabs.Content value="table" class="m-0">
				<FireTable />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</section>

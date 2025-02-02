<script lang="ts">
	import { formatAsCurrency } from '$lib/utils/formatters';
	import { getCalculatorState } from '../calculator.svelte';
	import { CheckCircle, XCircle } from 'lucide-svelte';

	let calculator = getCalculatorState();

	type GoalStatus = {
		text: string;
		achieved: boolean;
	};

	interface BaseRow {
		label: string;
		baseValue: () => number;
		comparisonValue: () => number;
		showDifference: boolean;
		isTotal?: boolean;
		formatValue?: never;
		formatDifference?: never;
	}

	interface GoalRow {
		label: string;
		baseValue: () => GoalStatus;
		comparisonValue: () => GoalStatus;
		showDifference: boolean;
		formatValue: (value: GoalStatus) => GoalStatus;
		formatDifference: () => string;
	}

	type TableRow = BaseRow | GoalRow;

	const baseRows: TableRow[] = [
		{
			label: 'Principal',
			baseValue: () => calculator.principal,
			comparisonValue: () => calculator.principal,
			showDifference: false
		},
		{
			label: 'Contributions',
			baseValue: () => calculator.baseResult.totalContributions,
			comparisonValue: () => calculator.comparisonResult.totalContributions,
			showDifference: true
		},
		{
			label: 'Interest',
			baseValue: () => calculator.baseResult.totalInterest,
			comparisonValue: () => calculator.comparisonResult.totalInterest,
			showDifference: true
		},
		{
			label: 'Total Value',
			baseValue: () => calculator.baseResult.totalValue,
			comparisonValue: () => calculator.comparisonResult.totalValue,
			showDifference: true,
			isTotal: true
		}
	];

	const rows = $derived([
		...baseRows,
		...(calculator.savingsGoal > 0
			? [
					{
						label: 'Goal Status',
						baseValue: () => {
							const yearReached = calculator.baseResult.annualData.findIndex(
								(data) => data.endingValue >= calculator.savingsGoal
							);
							return {
								text: yearReached === -1 ? 'Not achieved' : `Achieved in ${yearReached + 1} years`,
								achieved: yearReached !== -1
							};
						},
						comparisonValue: () => {
							const yearReached = calculator.comparisonResult.annualData.findIndex(
								(data) => data.endingValue >= calculator.savingsGoal
							);
							return {
								text: yearReached === -1 ? 'Not achieved' : `Achieved in ${yearReached + 1} years`,
								achieved: yearReached !== -1
							};
						},
						showDifference: true,
						formatValue: (value: GoalStatus) => value,
						formatDifference: () => {
							const baseYear = calculator.baseResult.annualData.findIndex(
								(data) => data.endingValue >= calculator.savingsGoal
							);
							const comparisonYear = calculator.comparisonResult.annualData.findIndex(
								(data) => data.endingValue >= calculator.savingsGoal
							);

							if (baseYear === -1 || comparisonYear === -1) return '-';

							const diff = comparisonYear - baseYear;
							return `${Math.abs(diff)} years ${diff < 0 ? 'faster' : 'slower'}`;
						}
					} as GoalRow
				]
			: [])
	]);
</script>

<div class="card">
	<h2 class="card-heading">Comparison</h2>
	<table class="w-full">
		<thead>
			<tr>
				<th class="text-left p-2">After {calculator.years} Years</th>
				<th class="text-right p-2">Outcome</th>
				<th class="text-right p-2">Comparison</th>
				<th class="text-right p-2">Difference</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr class={row.label === 'Total Value' ? 'font-bold' : ''}>
					<td class="p-2">{row.label}</td>
					<td class="text-right p-2">
						{#if row.formatValue}
							<div class="flex items-center justify-end gap-2">
								{#if row.formatValue(row.baseValue()).achieved}
									<CheckCircle class="w-4 h-4 text-emerald-500" />
								{:else}
									<XCircle class="w-4 h-4 text-red-500" />
								{/if}
								<span>{row.formatValue(row.baseValue()).text}</span>
							</div>
						{:else}
							{formatAsCurrency(row.baseValue())}
						{/if}
					</td>

					<td class="text-right p-2">
						{#if row.formatValue}
							<div class="flex items-center justify-end gap-2">
								{#if row.formatValue(row.comparisonValue()).achieved}
									<CheckCircle class="w-4 h-4 text-emerald-500" />
								{:else}
									<XCircle class="w-4 h-4 text-red-500" />
								{/if}
								<span>{row.formatValue(row.comparisonValue()).text}</span>
							</div>
						{:else}
							{formatAsCurrency(row.comparisonValue())}
						{/if}
					</td>
					<td class="text-right p-2">
						{#if row.showDifference}
							{row.formatDifference
								? row.formatDifference()
								: formatAsCurrency(row.comparisonValue() - row.baseValue())}
						{:else}
							-
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

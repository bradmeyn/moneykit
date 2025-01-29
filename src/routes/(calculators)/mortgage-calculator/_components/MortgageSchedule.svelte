<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';

	const calc = getCalculatorState();

	type AnnualDataType = {
		year: number;
		startBalance: number;
		interest: number;
		principal: number;
		extraRepayments: number;
		endBalance: number;
	};

	const annualData = $derived.by(() => {
		const breakdown = calc.projection.breakdown;
		const periodsPerYear = calc.periodsPerYear;

		return Object.values(
			breakdown.reduce((acc: Record<number, AnnualDataType>, period) => {
				const year = Math.ceil(period.period / periodsPerYear);

				if (!acc[year]) {
					acc[year] = {
						year,
						startBalance: 0,
						interest: 0,
						principal: 0,
						extraRepayments: 0,
						endBalance: 0
					};
				}

				const yearData = acc[year];

				// First period of the year sets the starting balance
				if (period.period % periodsPerYear === 1 || period.period === 1) {
					yearData.startBalance = period.balance + period.principal + period.extraRepayment;
				}

				yearData.interest += period.interest;
				yearData.principal += period.principal;
				yearData.extraRepayments += period.extraRepayment;
				yearData.endBalance = period.balance;

				return acc;
			}, {})
		);
	});
</script>

<div class="w-full overflow-auto max-h-[400px]">
	<table class="w-full">
		<thead class="sticky top-0 bg-gray-900">
			<tr class="text-left border-b border-gray-800">
				<th class="p-2">Year</th>
				<th class="p-2">Opening Balance</th>
				<th class="p-2">Principal</th>
				<th class="p-2">Interest</th>
				<th class="p-2">Extra Repayments</th>
				<th class="p-2">Closing Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr class="border-b border-gray-800">
					<td class="p-2">{data.year}</td>
					<td class="p-2">{formatAsCurrency(data.startBalance)}</td>
					<td class="p-2">{formatAsCurrency(data.principal)}</td>
					<td class="p-2">{formatAsCurrency(data.interest)}</td>
					<td class="p-2">{formatAsCurrency(data.extraRepayments)}</td>
					<td class="p-2">{formatAsCurrency(data.endBalance)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full overflow-auto max-h-[400px]">
	<table class="w-full">
		<thead class="sticky top-0 bg-gray-900">
			<tr class="text-left border-b border-gray-800">
				<th class="p-2">Year</th>
				<th class="p-2">Opening Balance</th>
				<th class="p-2">Principal</th>
				<th class="p-2">Interest</th>
				<th class="p-2">Extra Repayments</th>
				<th class="p-2">Closing Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr class="border-b border-gray-800">
					<td class="p-2">{data.year}</td>
					<td class="p-2">{formatAsCurrency(data.startBalance)}</td>
					<td class="p-2">{formatAsCurrency(data.principal)}</td>
					<td class="p-2">{formatAsCurrency(data.interest)}</td>
					<td class="p-2">{formatAsCurrency(data.extraRepayments)}</td>
					<td class="p-2">{formatAsCurrency(data.endBalance)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full overflow-auto max-h-[400px]">
	<table class="w-full">
		<thead class="sticky top-0 bg-gray-900">
			<tr class="text-left border-b border-gray-800">
				<th class="p-2">Year</th>
				<th class="p-2">Opening Balance</th>
				<th class="p-2">Principal</th>
				<th class="p-2">Interest</th>
				<th class="p-2">Extra Repayments</th>
				<th class="p-2">Closing Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr class="border-b border-gray-800">
					<td class="p-2">{data.year}</td>
					<td class="p-2">{formatAsCurrency(data.startBalance)}</td>
					<td class="p-2">{formatAsCurrency(data.principal)}</td>
					<td class="p-2">{formatAsCurrency(data.interest)}</td>
					<td class="p-2">{formatAsCurrency(data.extraRepayments)}</td>
					<td class="p-2">{formatAsCurrency(data.endBalance)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

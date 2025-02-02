<script lang="ts">
	import { getCalculatorState } from '../calculator.svelte';
	import { formatAsCurrency } from '$lib/utils/formatters';
	import ScrollArea from '$ui/scroll-area/scroll-area.svelte';
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

<ScrollArea class="h-[400px] w-full mt-4">
	<table class="w-full">
		<thead class="sticky top-0 bg-ui-900">
			<tr>
				<th>Year</th>
				<th>Opening Balance</th>
				<th>Principal</th>
				<th>Interest</th>
				<th>Extra Repayments</th>
				<th>Closing Balance</th>
			</tr>
		</thead>
		<tbody>
			{#each annualData as data}
				<tr>
					<td>{data.year}</td>
					<td>{formatAsCurrency(data.startBalance)}</td>
					<td>{formatAsCurrency(data.principal)}</td>
					<td>{formatAsCurrency(data.interest)}</td>
					<td>{formatAsCurrency(data.extraRepayments)}</td>
					<td>{formatAsCurrency(data.endBalance)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</ScrollArea>

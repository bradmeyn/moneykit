<script lang="ts">
	type Props = {
		income: number;
		deductions: number;
		incomeTax: number;
		lowIncomeOffset: number;
		medicareLevy: number;
		medicareLevySurcharge: number;
		totalTax: number;
	};

	// props
	export let results: Props;
	import { formatAsCurrency } from '$lib/utils/formatters';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
	<div>
		<table>
			<thead>
				<th>Detail</th>
				<th>Value ($)</th>
			</thead>
			<tbody>
				<tr>
					<td>Income</td>
					<td>{formatAsCurrency(results.income, false)}</td>
				</tr>
				<tr>
					<td>Deductions</td>
					<td>{formatAsCurrency(results.deductions, false)}</td>
				</tr>
				<tr>
					<td>Taxable Income</td>
					<td>{formatAsCurrency(results.income - results.deductions, false)}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div>
		<table>
			<thead>
				<th>Detail</th>
				<th>Value ($)</th>
			</thead>
			<tbody>
				<tr>
					<td>Income Tax</td>
					<td>{formatAsCurrency(results.incomeTax, false)}</td>
				</tr>
				{#if results.lowIncomeOffset > 0}
					<tr>
						<td>Low Income Offset</td>
						<td>({formatAsCurrency(results.lowIncomeOffset, false)})</td>
					</tr>
				{/if}

				<tr>
					<td>Medicare Levy</td>
					<td>{formatAsCurrency(results.medicareLevy, false)}</td>
				</tr>
				<tr>
					<td>Medicare Levy Surcharge</td>
					<td>{formatAsCurrency(results.medicareLevySurcharge, false)}</td>
				</tr>
				<tr>
					<td>Total Tax Payable</td>
					<td>{formatAsCurrency(results.totalTax, false)}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

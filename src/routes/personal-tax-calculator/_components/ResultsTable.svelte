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

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	// props
	export let results: Props;
	import { formatAsCurrency } from '$lib/utils/formatters';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
	<div>
		<Table>
			<TableHead>
				<TableHeadCell>Detail</TableHeadCell>
				<TableHeadCell>Value ($)</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>Income</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(results.income, false, true)}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Deductions</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(results.deductions, false, true)}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Taxable Income</TableBodyCell>
					<TableBodyCell
						>{formatAsCurrency(results.income - results.deductions, false, true)}</TableBodyCell
					>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>

	<div>
		<Table>
			<TableHead>
				<TableHeadCell>Detail</TableHeadCell>
				<TableHeadCell>Value ($)</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>Income Tax</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(results.incomeTax, false, true)}</TableBodyCell>
				</TableBodyRow>
				{#if results.lowIncomeOffset > 0}
					<TableBodyRow>
						<TableBodyCell>Low Income Offset</TableBodyCell>
						<TableBodyCell>({formatAsCurrency(results.lowIncomeOffset, false, true)})</TableBodyCell
						>
					</TableBodyRow>
				{/if}

				<TableBodyRow>
					<TableBodyCell>Medicare Levy</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(results.medicareLevy, false, true)}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Medicare Levy Surcharge</TableBodyCell>
					<TableBodyCell
						>{formatAsCurrency(results.medicareLevySurcharge, false, true)}</TableBodyCell
					>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Total Tax Payable</TableBodyCell>
					<TableBodyCell>{formatAsCurrency(results.totalTax, false, true)}</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
</div>

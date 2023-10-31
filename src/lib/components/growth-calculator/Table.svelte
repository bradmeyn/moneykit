<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let chartYears: number[];
	export let interestByYear: number[];
	export let contributionsByYear: number[];
	export let startingByYear: number[];
</script>

<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell>Year</TableHeadCell>
			<TableHeadCell>Start</TableHeadCell>
			<TableHeadCell>Interest</TableHeadCell>
			<TableHeadCell>Contribution</TableHeadCell>
			<TableHeadCell>End</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			<TableBodyRow>
				<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
				<TableBodyCell>Sliver</TableBodyCell>
				<TableBodyCell>Laptop</TableBodyCell>
				<TableBodyCell>$2999</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
				<TableBodyCell>White</TableBodyCell>
				<TableBodyCell>Laptop PC</TableBodyCell>
				<TableBodyCell>$1999</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Magic Mouse 2</TableBodyCell>
				<TableBodyCell>Black</TableBodyCell>
				<TableBodyCell>Accessories</TableBodyCell>
				<TableBodyCell>$99</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>

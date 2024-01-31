<script lang="ts">
	import Inputs from './Inputs.svelte';
	import TaxRateTable from './TaxRateTable.svelte';

	let financialYear = 2023;
	let income = 0;
	let deductions = 0;
	let hasInsurance = false;
</script>

<div class="md:flex gap-10">
	<Inputs bind:income bind:deductions bind:hasInsurance bind:financialYear />

	<TaxRateTable {financialYear} />
</div>

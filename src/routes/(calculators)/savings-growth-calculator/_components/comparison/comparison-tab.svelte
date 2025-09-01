<script lang="ts">
	import ComparisonChart from './comparison-chart.svelte';
	import ComparisonTable from './comparison-table.svelte';
</script>

<div>
	<ComparisonChart {comparisonData} />
	<ComparisonTable {comparisonData} />
</div>

<script lang="ts">
	import ComparisonChart from './comparison-chart.svelte';
	import ComparisonTable from './comparison-table.svelte';
	import { getCalculatorState } from '../../calculator.svelte';

	const calculator = getCalculatorState();
</script>

<div>
	<ComparisonChart baseData={calculator.result.annualData} savingsGoal={calculator.target} />
	<ComparisonTable comparisonData={{}} />
</div>

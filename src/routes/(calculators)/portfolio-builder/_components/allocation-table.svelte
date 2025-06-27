<script lang="ts">
	import { formatAsPercentage, formatAsCurrency } from '$utils/formatters';
	import { getPortfolioState } from '../calculator.svelte';

	const portfolio = getPortfolioState();
</script>

<div>
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr>
					<th class="text-left">Investment</th>
					<th class="text-right">Value</th>
					<th class="text-right">Aus Eq</th>
					<th class="text-right">Int Eq</th>
					<th class="text-right">Aus FI</th>
					<th class="text-right">Int FI</th>
					<th class="text-right">Cash</th>
					<th class="text-right">Alt</th>
				</tr>
			</thead>
			<tbody>
				{#each portfolio.portfolio as holding}
					<tr>
						<td>
							<div class="text-lg">
								{holding.investment.symbol}
							</div>
							<div class=" text-muted-foreground">
								{holding.investment.name}
							</div>
						</td>
						<td class="text-right"
							><div>
								{formatAsCurrency(holding.value)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.weight)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(holding.value * holding.investment.assetAllocation.ausEquities)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.ausEquities)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(holding.value * holding.investment.assetAllocation.intEquities)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.intEquities)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(
									holding.value * holding.investment.assetAllocation.ausFixedInterest
								)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.ausFixedInterest)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(
									holding.value * holding.investment.assetAllocation.intFixedInterest
								)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.intFixedInterest)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(holding.value * holding.investment.assetAllocation.cash)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.cash)}
							</div>
						</td>
						<td class="text-right">
							<div>
								{formatAsCurrency(holding.value * holding.investment.assetAllocation.alternatives)}
							</div>
							<div class="text-xs text-muted-foreground">
								{formatAsPercentage(holding.investment.assetAllocation.alternatives)}
							</div>
						</td>
					</tr>
				{/each}

				<!-- Totals Row -->
				<tr class="border-t border-gray-300 font-semibold">
					<td class="py-3">Totals</td>
					<td class="text-right py-3">{formatAsCurrency(portfolio.total)}</td>
					<td class="text-right py-3">
						<div>
							{formatAsCurrency(portfolio.total * portfolio.assetAllocation.ausEquities)}
						</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.ausEquities)}
						</div>
					</td>
					<td class="text-right py-3">
						<div>
							{formatAsCurrency(portfolio.total * portfolio.assetAllocation.intEquities)}
						</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.intEquities)}
						</div>
					</td>
					<td class="text-right py-3">
						<div>
							{formatAsCurrency(portfolio.total * portfolio.assetAllocation.ausFixedInterest)}
						</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.ausFixedInterest)}
						</div>
					</td>
					<td class="text-right py-3">
						<div>
							{formatAsCurrency(portfolio.total * portfolio.assetAllocation.intFixedInterest)}
						</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.intFixedInterest)}
						</div>
					</td>
					<td class="text-right py-3">
						<div>{formatAsCurrency(portfolio.total * portfolio.assetAllocation.cash)}</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.cash)}
						</div>
					</td>
					<td class="text-right py-3">
						<div>
							{formatAsCurrency(portfolio.total * portfolio.assetAllocation.alternatives)}
						</div>
						<div class="text-xs text-muted-foreground">
							{formatAsPercentage(portfolio.assetAllocation.alternatives)}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

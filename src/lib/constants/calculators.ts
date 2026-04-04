import type { Component } from 'svelte';
import { TrendingUp, Flame, Wallet, House, Banknote } from 'lucide-svelte';

export type Calculator = {
	name: string;
	href: string;
	description: string;
	icon: Component;
};

export const calculators: Calculator[] = [
	{
		name: 'Savings Calculator',
		href: '/savings-calculator',
		description: 'Project your savings growth and track progress towards your savings goal',
		icon: TrendingUp
	},
	{
		name: 'FIRE Calculator',
		href: '/fire-calculator',
		description: 'Calculate how much you need to retire early based on your expenses and withdrawal rate',
		icon: Flame
	},
	{
		name: 'Budget Planner',
		href: '/budget-planner',
		description: 'Create and download a detailed personal budget',
		icon: Wallet
	},
	{
		name: 'Mortgage Calculator',
		href: '/mortgage-calculator',
		description: 'Calculate repayments, total interest, and amortisation schedule for P&I, interest only, or variable rate loans',
		icon: House
	},
	{
		name: 'Income Tax',
		href: '/income-tax-calculator',
		description: 'Estimate your Australian income tax including Medicare Levy and HELP repayments',
		icon: Banknote
	}
] as const;

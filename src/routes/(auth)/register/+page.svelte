<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { registerSchema } from '../../../lib/schemas/auth';
	import { z } from 'zod';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { CircleCheckBig } from 'lucide-svelte';

	// export let page: PageData;
	// export let form: ActionData;

	let isLoading = $state(false);
	let serverError = $state('');

	let fieldErrors = $state({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: ''
	});

	function mapZodErrorsToFieldErrors(errors: z.ZodError) {
		const { fieldErrors: mapped } = errors.flatten();
		fieldErrors = { ...fieldErrors, ...mapped };
	}

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = registerSchema.safeParse(Object.fromEntries(formData));

		if (!validation.success) {
			mapZodErrorsToFieldErrors(validation.error);
			cancel();
			return;
		}

		return async ({ result, update }) => {
			isLoading = true;

			switch (result.type) {
				case 'success':
					isLoading = false;
					break;

				case 'failure':
					isLoading = false;
					serverError = result?.data?.error || 'An error occurred';
					
				default:
					break;
			}
			await update();
		};
	};
</script>

<header class=" max-w-md w-full pt-24 pb-4 container"></header>
<main class="flex-1">
	<div class="flex justify-center gap-4">
		<div class="w-full max-w-md">
			<a href="/" class="flex items-center gap-2 mb-8">
				<span class="text-white font-semibold text-4xl"
					>Wealth<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
						>Kit</span
					></span
				>
			</a>
			<div class="space-y-4">
				<div class="space-y-3">
					<div class="flex gap-2 items-center">
						<CircleCheckBig class="size-6 text-brand-default" />
						<h3 class="text-lg font-semibold text-white">Budget Management</h3>
					</div>
					<p class="text-slate-300 ml-8">Manage your personal budget with ease</p>
				</div>
				<div class="space-y-3">
					<div class="flex gap-2 items-center">
						<CircleCheckBig class="size-6 text-brand-default" />
						<h3 class="text-lg font-semibold text-white">Subscription Tracking</h3>
					</div>
					<p class="text-slate-300 ml-8">Keep track of your subscriptions</p>
				</div>
				<div class="space-y-3">
					<div class="flex gap-2 items-center">
						<CircleCheckBig class="size-6 text-brand-default" />
						<h3 class="text-lg font-semibold text-white">Financial Insights</h3>
					</div>
					<p class="text-slate-300 ml-8">Gain valuable insights into your financial habits</p>
				</div>
			</div>
		</div>

		<div class=" max-w-md w-full card">
			<h1 class="text-ui-300">Sign up for an account</h1>
			<form class="mt-8 space-y-6" method="POST" use:enhance={submit}>
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<label for="first-name" class="label">First name</label>
						<input
							class="input-base"
							id="first-name"
							name="firstName"
							type="text"
							required
							placeholder="First name"
						/>
						{#if fieldErrors.firstName}
							<p class="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>
						{/if}
					</div>
					<div class="col-span-1">
						<label for="last-name" class="label">Last name</label>
						<input
							class="input-base"
							id="last-name"
							name="lastName"
							type="text"
							required
							placeholder="Last name"
						/>
						{#if fieldErrors.lastName}
							<p class="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>
						{/if}
					</div>
					<div class="col-span-2">
						<label for="email" class="label">Email</label>
						<input
							autocomplete="off"
							class="input-base"
							id="email"
							name="email"
							type="email"
							required
							placeholder="Email"
						/>
						{#if fieldErrors.email}
							<p class="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
						{/if}
					</div>

					<div class="col-span-2">
						<label for="password" class="label">Password</label>
						<input
							class="input-base"
							id="password"
							name="password"
							type="password"
							required
							placeholder="Password"
						/>
						{#if fieldErrors.password}
							<p class="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
						{/if}
					</div>
					<div class="col-span-2">
						<label for="confirm-password" class="label">Confirm Password</label>
						<input
							class="input-base"
							id="confirm-password"
							name="confirmPassword"
							type="password"
							required
							placeholder="Confirm Password"
						/>
						{#if fieldErrors.confirmPassword}
							<p class="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>
						{/if}
					</div>
				</div>

				{#if serverError}
					<p class="text-red-500 text-sm">{serverError}</p>
				{/if}

				<div>
					<button
						type="submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-default hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-light"
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Sign up'}
					</button>
				</div>
			</form>
			<p class="mt-2 text-center text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="font-medium text-brand-default hover:text-brand-default">
					Sign in
				</a>
			</p>
		</div>
	</div>
</main>

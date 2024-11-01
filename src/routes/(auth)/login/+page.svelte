<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { loginSchema } from '../../../lib/schemas/auth';
	import { z } from 'zod';
	import type { SubmitFunction } from '@sveltejs/kit';

	// export let page: PageData;
	// export let form: ActionData;

	let isLoading = false;
	let serverError = '';

	let fieldErrors = {
		email: '',
		password: ''
	};

	function mapZodErrorsToFieldErrors(errors: z.ZodError) {
		const { fieldErrors: mapped } = errors.flatten();
		fieldErrors = { ...fieldErrors, ...mapped };
	}

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		const validation = loginSchema.safeParse(Object.fromEntries(formData));

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
	<div class="mx-auto max-w-md">
		<a href="/" class=" items-center gap-2 mb-6 block">
			<span class="text-white font-semibold text-4xl"
				>Wealth<span
					class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
					>Kit</span
				></span
			>
		</a>
		<div class="w-full card">
			<h1 class="text-ui-300">Sign in to your account</h1>
			<form class="mt-8 space-y-6" method="POST" use:enhance={submit}>
				<div class="rounded-md shadow-sm space-y-3">
					<div>
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
					</div>

					<div>
						<label for="password" class="label">Password</label>
						<input
							class="input-base"
							id="password"
							name="password"
							type="password"
							required
							placeholder="Password"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Sign in
					</button>
				</div>
			</form>
			<p class="mt-2 text-center text-sm text-gray-600">
				Don't have an account?
				<a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign up </a>
			</p>
		</div>
	</div>
</main>

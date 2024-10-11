<script>
	import { CircleCheckBig } from 'lucide-svelte';
	let email = '';
	let fullName = '';
	let country = 'Australia';
	let password = '';
	let subscribeToEmails = true;

	function handleSubmit() {
		// Handle form submission
		console.log('Form submitted', { email, fullName, country, password, subscribeToEmails });
	}
</script>

<header class=" max-w-md w-full pt-24 pb-4 container" />
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
			<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
				<div class="rounded-md shadow-sm space-y-3">
					<div>
						<label for="full-name" class="label">Full name</label>
						<input
							class="input-base"
							id="full-name"
							name="full-name"
							type="text"
							required
							placeholder="Full name"
							bind:value={fullName}
						/>
					</div>
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
							bind:value={email}
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
							bind:value={password}
						/>
					</div>
					<div>
						<label for="confirm-password" class="label">Confirm Password</label>
						<input
							class="input-base"
							id="confirm-password"
							name="confirm-password"
							type="password"
							required
							placeholder="Confirm Password"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Create account
					</button>
				</div>
			</form>
			<p class="mt-2 text-center text-sm text-gray-600">
				Already have an account?
				<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign in </a>
			</p>
		</div>
	</div>
</main>

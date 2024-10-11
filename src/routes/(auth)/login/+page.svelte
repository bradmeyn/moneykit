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
	<div class="mx-auto max-w-md">
		<a href="/" class=" items-center gap-2 mb-6 block">
			<span class="text-white font-semibold text-4xl"
				>Wealth<span
					class="text-transparent bg-clip-text bg-gradient-to-b from-brand-light to-brand-default"
					>Kit</span
				></span
			>
		</a>
		<div class="  w-full card">
			<h1 class="text-ui-300">Sign in to your account</h1>
			<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
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

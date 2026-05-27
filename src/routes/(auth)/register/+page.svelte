<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { registerUser } from '$lib/remotes/auth.remote';
</script>

<svelte:head>
	<title>Create account — MoneyKit</title>
</svelte:head>

<div class="w-full max-w-sm">
	<div class="rounded-xl border border-border bg-card p-8 shadow-sm">
		<div class="mb-6">
			<h1 class="heading-primary">Create an account</h1>
			<p class="mt-1 text-sm text-muted-foreground">Free, takes 30 seconds</p>
		</div>

		{#if registerUser.result?.success === false}
			<div class="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
				Registration failed. Please try again.
			</div>
		{/if}

		<form {...registerUser} class="space-y-4">
			{#each registerUser.fields.issues() as issue}
				<p class="text-sm text-destructive">{issue.message}</p>
			{/each}

			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label for="firstName">First name</Field.Label>
					<Input
						{...registerUser.fields.firstName.as('text')}
						id="firstName"
						autocomplete="given-name"
						placeholder="Jane"
					/>
					<Field.Error errors={registerUser.fields.firstName.issues()} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="lastName">Last name</Field.Label>
					<Input
						{...registerUser.fields.lastName.as('text')}
						id="lastName"
						autocomplete="family-name"
						placeholder="Smith"
					/>
					<Field.Error />
				</Field.Field>
			</div>

			<Field.Field>
				<Field.Label for="email">Email</Field.Label>
				<Input
					{...registerUser.fields.email.as('email')}
					id="email"
					type="email"
					autocomplete="email"
					placeholder="you@example.com"
				/>
				<Field.Error />
			</Field.Field>

			<Field.Field>
				<Field.Label for="password">Password</Field.Label>
				<Input
					{...registerUser.fields.password.as('password')}
					id="password"
					type="password"
					autocomplete="new-password"
					placeholder="••••••••"
				/>
				<Field.Error />
			</Field.Field>

			<Field.Field>
				<Field.Label for="confirmPassword">Confirm password</Field.Label>
				<Input
					{...registerUser.fields.confirmPassword.as('password')}
					id="confirmPassword"
					type="password"
					autocomplete="new-password"
					placeholder="••••••••"
				/>
				<Field.Error />
			</Field.Field>

			<Button type="submit" class="w-full" disabled={!!registerUser.pending}>
				{registerUser.pending ? 'Creating account…' : 'Create account'}
			</Button>
		</form>
	</div>

	<p class="mt-4 text-center text-sm text-muted-foreground">
		Already have an account?
		<a href="/login" class="font-medium text-primary hover:underline">Log in</a>
	</p>
</div>

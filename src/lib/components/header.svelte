<script lang="ts">
	import { logoutUser } from '$lib/remotes/auth.remote';
</script>

<header class="border-b bg-card">
	<div class="container flex items-center justify-between py-3">
		<a href="/" class="text-xl font-medium tracking-tight">
			Money<span class="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-dark"
				>Kit</span
			>
		</a>
		<form {...logoutUser.enhance()} method="POST">
			<button
				type="submit"
				class="text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				Log out
			</button>
		</form>
	</div>
</header>

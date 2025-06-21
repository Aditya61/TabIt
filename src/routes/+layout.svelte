<script>
	import '../app.css';
	
	let { data, children } = $props();

	async function logout() {
		await fetch('/logout');
		window.location.href = '/login';
	}
</script>
{#if data.user}
	<a href="/logout">Logout</a>
{/if}

{@render children()}

<script>
	import '../app.css';
	import { page } from "$app/state";
	import { fly, fade } from 'svelte/transition';
	import { isSettingsOpen } from '$lib/stores/settingsPanel.js';
	import { onMount } from 'svelte';

	onMount(() => {
		if ('serviceworker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
				.then(reg => {
					reg.addEventListener('updatefound', () => {
						const newSW = reg.installing;
						newSW?.addEventListener('statechange', () => {
							if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
								console.log('New version available, refreshing...');
								newSW.postMessage({ type: 'SKIP_WAITING' });
							}
						});
					});
				});

			navigator.serviceWorker.addEventListener('controllerchange', () => {
				window.location.reload();
			});
		}
	});

	let { data, children } = $props();

	async function logout() {
		await fetch('/logout');
		window.location.href = '/login';
	}
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="theme-color" content="#4a148c" />
	<link rel="apple-touch-icon" href="icons/icon-192.png" />
</svelte:head>

<header class="bg-slate-50 border-b-1 border-gray-200 w-full h-[72px] px-3 py-4 flex justify-center items-center">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	{#if page.url.pathname !== "/offline"}
		<button class="absolute left-4 z-50" onclick={() => $isSettingsOpen = true}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
				viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
				stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings drop-shadow-md">
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
				<circle cx="12" cy="12" r="3"/>
			</svg>
		</button>
	{/if}
	{#if page.url.pathname === "/creditors"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">All Creditors</h1>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<a href="/creditors/new" class="absolute right-4">
			<svg width="20" height="20" class="drop-shadow-md" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11.9629 0C12.5152 0 12.9629 0.447715 12.9629 1V6.85156H19C19.5522 6.85156 19.9998 7.29941 20 7.85156V11.9629C20 12.5152 19.5523 12.9629 19 12.9629H12.9629V19C12.9629 19.5523 12.5152 20 11.9629 20H7.85156C7.29939 19.9999 6.85156 19.5522 6.85156 19V12.9629H1C0.447715 12.9629 0 12.5152 0 11.9629V7.85156C0.000156636 7.29941 0.447812 6.85156 1 6.85156H6.85156V1C6.85156 0.447797 7.29939 0.000131895 7.85156 0H11.9629Z" fill="url(#paint0_linear_7_42)"/>
				<defs>
				<linearGradient id="paint0_linear_7_42" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
				<stop/>
				<stop offset="0.54" stop-color="#010000"/>
				<stop offset="1" stop-color="#B10000"/>
				</linearGradient>
				</defs>
			</svg>
		</a>
	{:else if page.url.pathname === "/"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Tabit</h1>
	{:else if page.url.pathname === "/offline"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">You are Offline</h1>
	{:else if page.url.pathname === "/login"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Login</h1>
	{:else if page.url.pathname === "/signup"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Sign Up</h1>
	{:else if page.url.pathname === "/creditors/new"}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Add New Creditor</h1>
	{:else if /^\/creditors\/dashboard\/[^/]+$/.test(page.url.pathname)}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Dashboard</h1>
	{:else if /^\/creditors\/dashboard\/[^/]+\/credit\/new$/.test(page.url.pathname)}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">New Credit</h1>
	{:else if /^\/creditors\/dashboard\/[^/]+\/credit\/[^/]+$/.test(page.url.pathname)}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">Credit Details</h1>
	{:else if /^\/creditors\/dashboard\/[^/]+\/payment\/new$/.test(page.url.pathname)}
		<h1 class="text-gray-800 font-bold font-sans text-xl text-center">New Payment</h1>
	{/if}

</header>

{#if $isSettingsOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={"fixed inset-0 bg-black/50 z-40"} in:fade={{duration: 500}} out:fade={{duration: 500}} onclick={() => $isSettingsOpen = false}></div>

	<div class="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50" in:fly={{x: -300, duration: 500}} out:fly={{x: -300, duration: 500}}>
		<div class="p-4">
			<h2 class="text-xl font-bold text-center py-2 shadow-sm rounded-md mb-4">Settings</h2>
			{#if data.user}
				<a class="text-lg font-semibold" href="/logout">Logout</a>
			{/if}
		</div>
	</div>
{/if}

{@render children()}

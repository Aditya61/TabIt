<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
    export let data;

    // Check for user and redirect to appropriate route
    onMount(() => {
        if (data?.user) {
            goto('/creditors');
        } else {
            goto('/login');
        }
    })
</script>

<div class="my-52 w-full flex items-center justify-center">
    <Loader />
</div>
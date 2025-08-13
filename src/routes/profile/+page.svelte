<script>
    import Loader from '$lib/components/Loader.svelte';

    export let data;

    const user = data.user;
    let businessName = user.businessName;

    let isSubmitting = false;
</script>

{#if isSubmitting && !data}
    <div class="w-full h-full bg-white/50 flex justify-center items-center top-0 left-0 z-20 absolute">
        <Loader />
    </div>
{/if}

<div class="w-full flex items-center justify-between p-4">
    <h1 class="text-lg font-semibold">Name:</h1>
    <h1 class="text-lg font-semibold">{ user.name }</h1>
</div>

<form method="POST" onsubmit={() => isSubmitting = true}>
    <input class="hidden" name="userId" value={user.id} required />
    <div class="w-full flex items-center justify-between p-4">
        <label for="phone" class="text-lg font-semibold">
            Business Name:
        </label>
        <input id="phone" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" bind:value={businessName} name="businessName" required />
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 fixed bottom-0 z-10 text-md text-cyan-900 font-semibold" type="submit">Save Changes</button>
</form>
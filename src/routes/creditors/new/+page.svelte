<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import Loader from '$lib/components/Loader.svelte';
    export let form;

    onMount(() => {
        const handleBack = (event) => {
            event.preventDefault();
            goto('/creditors');
        };

        window.addEventListener('popstate', handleBack);

        onDestroy(() =>  {
            window.removeEventListener('popstate', handleBack);
        });
    });

    let isSubmitting = false;
</script>

{#if isSubmitting && !form}
    <div class="w-full h-full bg-white/50 flex justify-center items-center top-0 left-0 z-20 absolute">
        <Loader />
    </div>
{/if}

<form method="POST">

    <div class="w-full flex items-center justify-between p-4">
        <label for="name" class="text-lg font-semibold">
            Name:
        </label>
        <input id="name" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" name="name" required />
    </div>
    <div class="w-full flex items-center justify-between p-4">
        <label for="phone" class="text-lg font-semibold">
            Phone:
        </label>
        <input id="phone" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" name="phone" required />
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 absolute bottom-0 z-10 text-md text-cyan-900 font-semibold" onclick={() => isSubmitting = true} type="submit">Add Creditor</button>
</form>

{#if form?.success}
    <p class="text-green-500 p-4 font-semibold w-full text-center text-lg">{form.success}</p>
{/if}
{#if form?.message}
    <p class="text-red-500 p-4 font-semibold w-full text-center text-lg">{form.message}</p>
{/if}
<script>
	import { onMount } from 'svelte';

    export let form;

    onMount(() => {
        if (form?.success) {
            window.location.href = "/";
        }
    })
</script>

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

    <div class="w-full flex items-center justify-between p-4">
        <label for="password" class="text-lg font-semibold">
            Password:
        </label>
        <input id="password" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" type="password" name="password" required />
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 absolute bottom-0 z-10 text-md text-cyan-900 font-semibold" type="submit">Sign Up</button>
</form>

{#if form?.message}
    <p class="text-red-500 p-4 font-semibold w-full text-center text-lg">{form.message}</p>
{/if}
<script>
	import { onMount } from 'svelte';
    import Loader from '$lib/components/Loader.svelte';

    export let form;

    onMount(() => {
        isSubmitting = false;

        if (form?.success) {
            window.location.href = "/";
        }
    })

    let isSubmitting = false;

    function showLoader(event) {
        const form = event.target.form;

        if (!form.checkValidity()) {
            return;
        }

        isSubmitting = true;
    }
</script>

{#if isSubmitting}
    <div class="w-full h-full bg-white/50 flex justify-center items-center top-0 left-0 z-20 absolute">
        <Loader />
    </div>
{/if}

<form method="POST">
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

    <div class="w-full flex items-center justify-end gap-4 p-4">
        <label for="remember" class="text-lg font-semibold">
            Remember Me
        </label>
        <input id="remember" type="checkbox" class="shadow-md focus:ring-0 focus:shadow-lg rounded-sm h-5 w-5" name="remember" />
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 fixed bottom-0 z-10 text-md text-cyan-900 font-semibold" onclick={showLoader} type="submit">Login</button>
</form>

{#if form?.message}
    <p class="text-red-500 p-4 font-semibold w-full text-center text-lg">{form.message}</p>
{/if}

<h3 class="p-4 text-md w-full text-center">Don't have an account yet? <a class="text-blue-700 font-semibold " href="/signup">Sign Up</a></h3>
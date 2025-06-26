<script>
    export let form;
</script>

<form method="POST">
    <label>
        Name:
        <input name="name" required />
    </label>

    <label>
        Phone:
        <input name="phone" required />
    </label>

    <label>
        Password:
        <input name="password" type="password" required />
    </label>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 absolute bottom-0 z-10 text-md text-cyan-900 font-semibold" type="submit">Sign Up</button>
</form>

{#if form?.success}
    <p class="text-green-600">{form.success}</p>
{/if}

{#if form?.message}
    <p class="text-red-600">{form.message}</p>
{/if}
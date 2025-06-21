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

    <button type="submit">Sign Up</button>
</form>

{#if form?.success}
    <p class="text-green-600">{form.success}</p>
{/if}

{#if form?.message}
    <p class="text-red-600">{form.message}</p>
{/if}
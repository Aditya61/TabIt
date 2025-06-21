<script>
    export let form;
</script>

<form method="POST">
    <label>
        Phone:
        <input name="phone" required />
    </label>

    <label>
        Password:
        <input name="password" type="password" required />
    </label>

    <label>
        Remember Me:
        <input name="remember" type="checkbox" />
    </label>

    <button type="submit">Login</button>
</form>

{#if form?.success}
    <p class="text-green-500">{form.success}</p>
{/if}
{#if form?.message}
    <p class="text-red-500">{form.message}</p>
{/if}
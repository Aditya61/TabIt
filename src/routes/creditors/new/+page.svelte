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

    <button type="submit">Add Creditor</button>
</form>

{#if form?.success}
    <p class="text-green-500">{form.success}</p>
{/if}
{#if form?.message}
    <p class="text-red-500">{form.message}</p>
{/if}
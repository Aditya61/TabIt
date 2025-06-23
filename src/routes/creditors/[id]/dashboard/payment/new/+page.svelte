<script>
    export let form;
</script>

<form method="POST">
    <label>
        Amount:
        <input name="amount" type="number" step="0.01" required />
    </label>

    <label>
        Method:
        <select name="method" required>
            <option value="CASH">CASH</option>
            <option value="UPI">UPI</option>
            <option value="CARD">CARD</option>
        </select>
    </label>

    <button type="submit">Submit</button>
</form>

{#if form?.success}
    <p class="text-green-500">{form.success}</p>
{/if}
{#if form?.message}
    <p class="text-red-500">{form.message}</p>
{/if}
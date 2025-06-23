<script>
    export let form;

    let items = [
        { name: '', quantity: 0, totalPrice: 0 }
    ];

    function addItem() {
        items = [...items, { name: '', quantity: 0, totalPrice: 0 }];
    }

    function removeItem(index) {
        items = items.filter((_, i) => i!== index);
    }
</script>

<form method="POST">
    <h3>Itemized Entries</h3>
    {#each items as item, i}
        <div>
            <input name="items[][name]" placeholder="Name" bind:value={item.name} required />
            <input type="number" step="0.01" name="items[][quantity]" placeholder="Quantity" bind:value={item.quantity} required />
            <input type="number" step="0.01" name="items[][totalPrice]" placeholder="Total Price" bind:value={item.totalPrice} required />
            {#if items.length > 1}
                <button type="button" onclick={() => removeItem(i)}>Remove</button>
            {/if}
        </div>
    {/each}
    <button type="button" onclick={addItem}>Add Item</button>
    <br>
    <button type="submit">Submit</button>
</form>

{#if form?.message}
    <p class="text-red-500">{form.message}</p>
{/if}
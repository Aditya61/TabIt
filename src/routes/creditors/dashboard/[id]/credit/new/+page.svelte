<script>
    import Loader from '$lib/components/Loader.svelte';
    export let form;

    // Initializing item
    let items = [
        { name: '', quantity: 1, totalPrice: '' }
    ];

    // Handle new item addition
    function addItem() {
        items = [...items, { name: '', quantity: 1, totalPrice: '' }];
    }

    // Handle item removal
    function removeItem(index) {
        items = items.filter((_, i) => i!== index);
    }

    let isSubmitting = false;
</script>

{#if isSubmitting && !form}
    <div class="w-full h-full bg-white/50 flex justify-center items-center top-0 left-0 z-20 absolute">
        <Loader />
    </div>
{/if}

<div class="w-full grid grid-cols-8 font-semibold border-b border-gray-400 pb-2 mb-2 text-gray-600 text-center">
    <h2 class="col-span-3">Product</h2>
    <h2 class="col-span-2">Quantity</h2>
    <h2 class="col-span-2">Total Price</h2>
</div>
<form method="POST">
    {#each items as item, i}
        <div class="w-full grid grid-cols-8 font-semibold mb-2">
            <input class="col-span-3 border-none focus:ring-0 shadow-sm focus:shadow-md mx-0.5" name="items[][name]" placeholder="Name" bind:value={item.name} required />
            <input class="col-span-2 border-none focus:ring-0 shadow-sm focus:shadow-md mx-0.5" type="number" step="0.01" name="items[][quantity]" placeholder="Qty" bind:value={item.quantity} required />
            <input class="col-span-2 border-none focus:ring-0 shadow-sm focus:shadow-md mx-0.5" type="number" step="0.01" name="items[][totalPrice]" placeholder="₹" bind:value={item.totalPrice} required />
            {#if items.length > 1}
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button class="col-span-1 mx-0.5 p-2" type="button" onclick={() => removeItem(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-red-700 focus:drop-shadow-red-500 focus:drop-shadow-sm">
                      <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                    </svg>
                </button>
            {/if}
        </div>
    {/each}
    <button class="m-2 mb-[60px] p-2 bg-indigo-500 text-xl text-white font-semibold rounded-md shadow-md hover:shadow-lg" type="button" onclick={addItem}>Add</button>
    <br>
    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 fixed bottom-0 z-10 text-md text-cyan-900 font-semibold" onclick={() => isSubmitting = true} type="submit">Submit</button>
</form>

{#if form?.message}
    <p class="text-red-500">{form.message}</p>
{/if}
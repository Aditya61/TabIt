<script>
    export let data;

    const credit = data?.credit;
</script>

<h1>{credit.id}</h1>
<h1>{credit.date}</h1>
<h1>{credit.status}</h1>
<h1>{credit.amtRemaining}</h1>
<h1>{credit.amtPaid}</h1>

<div class="flex flex-wrap justify-evenly">
        <h2>Name</h2>
        <h2>Quantity</h2>
        <h2>Total Price</h2>
    </div>
{#each credit.items as item}
    <div class="flex flex-wrap justify-evenly">
        <h2>{item.name}</h2>
        <h2>{item.quantity}</h2>
        <h2>{item.totalPrice}</h2>
    </div>
{/each}
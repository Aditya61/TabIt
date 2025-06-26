<script>
    export let data;

    const credit = data?.credit;
</script>

<div class="p-4 w-full rounded-lg shadow-md">
    <h1 class="font-semibold text-lg">{new Date(credit.date).toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"})}</h1>
    {#if credit.status === "PAID"}
        <h2 class="text-md mt-2 font-medium text-green-600">{credit.status}</h2>
    {:else if credit.status === "PARTIALLY PAID"}
        <h2 class="text-md mt-2 font-medium text-yellow-600">{credit.status}</h2>
    {:else if credit.status === "PENDING"}
        <h2 class="text-md mt-2 font-medium text-red-600">{credit.status}</h2>
    {/if}
    <h2 class="font-semibold mt-2">Amount Remaining:  ₹ {credit.amtRemaining}</h2>
    <h2 class="font-semibold mt-2">Amount Paid:  ₹ {credit.amtPaid}</h2>
</div>

<div class="my-2 rounded-md p-4 border-1 border-gray-300">
    <div class="grid grid-cols-3 font-semibold border-b border-gray-400 pb-2 mb-2 text-gray-600 text-center">
        <h2>Name</h2>
        <h2>Quantity</h2>
        <h2>Total Price</h2>
    </div>
    {#each credit.items as item}
        <div class="grid grid-cols-3 font-medium pb-2 mb-2 text-center">
            <h2>{item.name}</h2>
            <h2>{item.quantity}</h2>
            <h2>{item.totalPrice}</h2>
        </div>
    {/each}
</div>
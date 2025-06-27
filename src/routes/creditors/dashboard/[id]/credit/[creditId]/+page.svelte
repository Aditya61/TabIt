<script>
    export let data;

    const credit = data?.credit;
    const name = data?.name;
    const phone = data?.phone;
    const outstanding = data?.outstanding;

    function generateMessage() {
        let message = "";
        message += `Itemized Bill for ${name} \nDate: ${new Date(credit.date).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"})}\n\n`;
        const itemString = credit.items.map(item => `${item.name} (${item.quantity})  -  ₹ ${item.totalPrice}`).join('\n');
        message += itemString;
        message += `\n\nAmount Remaining: ₹ ${credit.amtRemaining}`
        message += `\nAmount Paid: ₹ ${credit.amtPaid}`
        message += `\n\nTotal Outstanding: ₹ ${outstanding}`
        window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }
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
    <h2 class="font-semibold my-2">Amount Paid:  ₹ {credit.amtPaid}</h2>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button onclick={generateMessage}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-green-700">
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
        </svg>
    </button>
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
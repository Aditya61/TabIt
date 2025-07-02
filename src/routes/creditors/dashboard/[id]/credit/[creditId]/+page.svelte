<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    export let data;

    onMount(() => {
        const handleBack = (event) => {
            event.preventDefault();
            goto(`/creditors/dashboard/${data?.creditor.id}`);
        };

        window.addEventListener('popstate', handleBack);

        onDestroy(() =>  {
            window.removeEventListener('popstate', handleBack);
        });
    });

    const credit = data?.credit;
    const name = data?.creditor.name;
    const phone = data?.creditor.phone;
    const outstanding = data?.creditor.outstanding;

    function generateMessage() {
        let message = "";
        message += `Itemized Bill for ${name} \nDate: ${new Date(credit.date).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"})}\n\n`;
        let itemString = "";
        credit.items.forEach((item, index) => {
            const itemName = `${item.name} (${item.quantity})`.padEnd(25, " ");
            const itemPrice = `- ₹ ${item.totalPrice}`;
            itemString += `${itemName}${itemPrice}\n`;
        });
        message += itemString;
        message += `\n\nBilling Amount:`.padEnd(25, " ")+ `₹ ${credit.amtRemaining + credit.amtPaid}`;
        message += `\n\nAmount Paid:`.padEnd(25, " ") +` ₹ ${credit.amtPaid}`;
        message += `\nAmount Remaining:`.padEnd(25, " ") +` ₹ ${credit.amtRemaining}`;
        message += `\n\nTotal Outstanding:`.padEnd(25, " ") +` ₹ ${outstanding}`;
        window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    }

    let toggleDeleteConfirmation = false;
</script>

{#if toggleDeleteConfirmation}
    <div class="absolute top-0 left-0 z-40 w-full h-full bg-black/50 flex justify-center items-center">
        <form method="POST">
            <div class="p-4 mx-2 bg-white rounded-lg">
                <h3 class="py-2 text-md font-semibold">Are you sure you want to delete this credit?</h3>
                <h4 class="py-2 text-sm font-medium">Note: Any payment done to this credit won't be redistributed.</h4>
                <div class="grid grid-cols-3 gap-2">
                    <button class="bg-green-600 text-white font-bold text-center rounded-md col-start-2 py-2" onclick={() => { toggleDeleteConfirmation = false; }}>No</button>
                    <button class="bg-red-600 text-white font-bold text-center rounded-md col-start-3 py-2" type="submit">Yes</button>
                </div>
            </div>
        </form>
    </div>
{/if}

<div class="p-4 w-full rounded-lg shadow-md flex justify-between">
    <div>
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
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="mx-0.5" type="button" onclick={() => { toggleDeleteConfirmation = true; }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-red-700 focus:drop-shadow-red-500 focus:drop-shadow-sm">
          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
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
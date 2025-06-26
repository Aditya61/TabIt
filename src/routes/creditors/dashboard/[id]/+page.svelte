<script>
    export let data;

    const creditor = data.creditor;
    let visible = "Credits";
</script>

<div class="w-full h-32 my-2 p-4 flex justify-between items-center rounded-lg shadow-md">
    <div class="">
        <h1 class="my-5 font-semibold text-lg">{creditor.name}</h1>
        <div class="my-5 flex gap-3">
            <h2 class="font-semibold text-lg">Outstanding:</h2>
            <h2 class="font-semibold text-lg text-red-600">₹ {creditor.outstanding}</h2>
        </div>
    </div>
</div>

{#if visible === "Credits"}
    <div class="w-full p-3">
        {#each creditor.credits as credit}
            <a href="/creditors/dashboard/{creditor.id}/credit/{credit.id}">
                <div class="flex flex-wrap p-2 my-2 rounded-lg shadow-sm justify-between">
                    <div>
                        <h2 class="text-md font-bold">{new Date(credit.date).toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"})}</h2>
                        {#if credit.status === "PAID"}
                            <h2 class="text-md font-medium text-green-600">{credit.status}</h2>
                        {:else if credit.status === "PARTIALLY PAID"}
                            <h2 class="text-md font-medium text-yellow-600">{credit.status}</h2>
                        {:else if credit.status === "PENDING"}
                            <h2 class="text-md font-medium text-red-600">{credit.status}</h2>
                        {/if}
                    </div>
                    {#if credit.status === "PAID"}
                        <h2 class="test-lg font-bold text-green-600">₹ {credit.amtRemaining}</h2>
                    {:else if credit.status === "PARTIALLY PAID"}
                        <h2 class="test-lg font-bold text-yellow-600">₹ {credit.amtRemaining}</h2>
                    {:else if credit.status === "PENDING"}
                        <h2 class="test-lg font-bold text-red-600">₹ {credit.amtRemaining}</h2>
                    {/if}
                </div>
            </a>
        {/each}
    </div>
{/if}

{#if visible === "Payments"}
    <div class="w-full p-3">
        {#each creditor.payments as payment}
            <div class="flex flex-wrap p-2 my-2 rounded-lg shadow-sm justify-between">
                <div>
                    <h2 class="text-md font-bold">{new Date(payment.date).toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"})}</h2>
                    <h2 class="text-md font-medium text-green-600">{payment.method}</h2>
                </div>
                <h2 class="test-lg font-bold text-green-600">₹ {payment.amount}</h2>
            </div>
        {/each}
    </div>
{/if}

<footer class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 absolute bottom-0 z-10">
    <button class="text-md text-cyan-900 font-semibold" onclick={() => {visible = "Credits"}}>Credits</button>
    <button class="text-md text-cyan-900 font-semibold" onclick={() => {visible = "Payments"}}>Payments</button>
</footer>
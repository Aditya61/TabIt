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
    <div class="flex gap-5">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a href={`/creditors/dashboard/${creditor.id}/credit/new`}>
            <svg width="25" height="25" class="m-1 drop-shadow-md" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		    	<path d="M11.9629 0C12.5152 0 12.9629 0.447715 12.9629 1V6.85156H19C19.5522 6.85156 19.9998 7.29941 20 7.85156V11.9629C20 12.5152 19.5523 12.9629 19 12.9629H12.9629V19C12.9629 19.5523 12.5152 20 11.9629 20H7.85156C7.29939 19.9999 6.85156 19.5522 6.85156 19V12.9629H1C0.447715 12.9629 0 12.5152 0 11.9629V7.85156C0.000156636 7.29941 0.447812 6.85156 1 6.85156H6.85156V1C6.85156 0.447797 7.29939 0.000131895 7.85156 0H11.9629Z" fill="url(#paint0_linear_7_42)"/>
		    	<defs>
		    	<linearGradient id="paint0_linear_7_42" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
		    	<stop/>
		    	<stop offset="0.54" stop-color="#010000"/>
		    	<stop offset="1" stop-color="#B10000"/>
		    	</linearGradient>
		    	</defs>
		    </svg>
        </a>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a href={`/creditors/dashboard/${creditor.id}/payment/new`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-green-700 drop-shadow-md">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z" clip-rule="evenodd" />
            </svg>
        </a>
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
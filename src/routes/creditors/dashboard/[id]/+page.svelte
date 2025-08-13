<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    export let data;

    onMount(() => {
        const handleBack = (event) => {
            event.preventDefault();
            goto('/creditors');
        };

        window.addEventListener('popstate', handleBack);

        onDestroy(() =>  {
            window.removeEventListener('popstate', handleBack);
        });
    });

    const creditor = data.creditor;
    const user = data.user;
    
    // Toggle between credits and payments history
    let visible = "Credits";

    // Generate message for overall pending and partially paid credits and current outstanding
    function generateMessage() {
        let message = "";
        if (user.businessName != "") {
            message += `*${user.businessName}*\n\n`;
        }
        message += `Credit Report for ${creditor.name}\n\n`;
        const creditString = creditor.credits.map(credit => { if (credit.status != "PAID") { return `${new Date(credit.date).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"})} - ₹ ${credit.amtRemaining}`}}).join('\n');
        message += creditString;
        message += `\nTotal Outstanding: ₹ ${creditor.outstanding}`
        window.location.href = `https://wa.me/${creditor.phone}?text=${encodeURIComponent(message)}`;
    }

    // Generate message for individual payments including data from outstanding log
    function generatePaymentMessage(payment) {
        let message = "";
        if (user.businessName != "") {
            message += `*${user.businessName}*\n\n`;
        }
        message += `Payment for ${creditor.name}\n\n`;
        message += `Date: ${new Date(payment.date).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "short"})}`;
        message += `\n\nPrevious:`.padEnd(25, " ")+ `₹ ${payment.OutstandingLog[0].prevOutstanding}`;
        message += `\nPayment:`.padEnd(25, " ")+ `- ₹ ${payment.amount}`;
        message += `\n\nNext Outstanding:`.padEnd(25, " ")+ `₹ ${payment.OutstandingLog[0].nextOutstanding}`;
        message += `\n\nCurrent Outstanding:`.padEnd(25, " ")+ `₹ ${creditor.outstanding}`;
        window.location.href = `https://wa.me/${creditor.phone}?text=${encodeURIComponent(message)}`;
    }
</script>

<div class="w-full h-48 p-4 flex justify-between items-center rounded-lg shadow-md">
    <div class="">
        <h1 class="my-5 font-semibold text-lg">{creditor.name}</h1>
        <div class="my-5 flex gap-3">
            <h2 class="font-semibold text-lg">Outstanding:</h2>
            <h2 class="font-semibold text-lg text-red-600">₹ {creditor.outstanding}</h2>
        </div>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button onclick={generateMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-green-700">
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
        </button>
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
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button onclick={generatePaymentMessage(payment)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-green-700">
                          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                        </svg>
                    </button>
                </div>
                <h2 class="test-lg font-bold text-green-600">₹ {payment.amount}</h2>
            </div>
        {/each}
    </div>
{/if}

<footer class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 fixed bottom-0 z-10">
    <button class="text-md text-cyan-900 font-semibold" onclick={() => {visible = "Credits"}}>Credits</button>
    <button class="text-md text-cyan-900 font-semibold" onclick={() => {visible = "Payments"}}>Payments</button>
</footer>
<script>
    export let data;
    const creditor = data.creditor;
</script>

<h1>{creditor.name}</h1>
<h1>{creditor.phone}</h1>
<h1>{creditor.outstanding}</h1>

{#each creditor.credits as credit}
    <a href="/creditors/{creditor.id}/dashboard/credit/{credit.id}">
        <div class="flex flex-wrap">
            <div>
                <h2>{credit.date}</h2>
                <h2>{credit.status}</h2>
            </div>
            <h2>{credit.amtRemaining}</h2>
        </div>
    </a>
{/each}

<br>
<h1>Payments</h1>
{#each creditor.payments as payment}
    <div class="flex flex-wrap">
        <div>
            <h2>{payment.date}</h2>
            <h2>{payment.method}</h2>
        </div>
        <h2>{payment.amount}</h2>
    </div>
{/each}
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
                <h2>{credit.id}</h2>
                <h2>{credit.date}</h2>
            </div>
            <h2>{credit.amtRemaining}</h2>
        </div>
    </a>
{/each}
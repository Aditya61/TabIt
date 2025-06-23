<script>
    export let data;
</script>

{#if data.creditors.length > 0}
    <h1>Your Creditors</h1>
    <ul>
        {#each data.creditors as creditor}
            <a href="/creditors/{creditor.id}/dashboard"><li class="flex flex-wrap justify-between">
                <div>
                    <h2>{creditor.name}</h2>
                    <h2>{creditor.phone}</h2>
                </div>
                <h2>{creditor.outstanding}</h2>
            </li></a>
        {/each}
    </ul>
{:else}
    <h1>No Creditors Found!</h1>
{/if}
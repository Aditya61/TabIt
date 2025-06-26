<script>
    export let data;

    let searchString = "";

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    }

    const creditors = data.creditors;
</script>
<div class="w-full px-2 my-3">
    <label>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-search-icon lucide-search z-10 m-2.5 absolute">
            <path d="m21 21-4.34-4.34"/>
            <circle cx="11" cy="11" r="8"/>
        </svg>
        <input class="w-full rounded-full px-10 text-lg font-semibold bg-gray-100 border-0 focus:ring focus:ring-purple-300" name="Search" type="text" bind:value={searchString} />
    </label>
</div>
{#if creditors.length > 0}
    <ul>
        {#each creditors.filter(c => new RegExp(escapeRegExp(searchString), 'i').test(c.name)) as creditor}
            <a href="/creditors/dashboard/{creditor.id}">
                <li class="flex justify-between items-center w-full h-[70px] mb-[3px] px-4">
                    <div>
                        <h2 class="text-lg font-semibold font-sans">{creditor.name}</h2>
                        <h2 class="text-md text-purple-800 font-medium">{creditor.phone}</h2>
                    </div>
                    <h2 class="text-lg text-red-700 font-semibold">₹ {creditor.outstanding}</h2>
                </li>
            </a>
        {/each}
    </ul>
{:else}
    <h1>No Creditors Found!</h1>
{/if}
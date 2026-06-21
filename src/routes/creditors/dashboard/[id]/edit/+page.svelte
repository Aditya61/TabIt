<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import Loader from '$lib/components/Loader.svelte';
    export let data;
    export let form;

    onMount(() => {
        isSubmitting = false;

        const handleBack = (event) => {
            event.preventDefault();
            goto(`/creditors/dashboard/${data.creditor.id}`);
        };

        window.addEventListener('popstate', handleBack);

        onDestroy(() =>  {
            window.removeEventListener('popstate', handleBack);
        });
    });

    const creditor = data.creditor;
    let name = creditor.name;
    let phone = creditor.phone;

    // Toggle display of delete confirmation window
    let toggleDeleteConfirmation = false;

    let isSubmitting = false;

    function showLoader(event) {
        const form = event.target.form;

        if (!form.checkValidity()) {
            return;
        }

        isSubmitting = true;
    }
</script>

{#if isSubmitting}
    <div class="w-full h-full bg-white/50 flex justify-center items-center top-0 left-0 z-20 absolute">
        <Loader />
    </div>
{/if}

{#if toggleDeleteConfirmation}
    <div class="absolute top-0 left-0 z-30 w-full h-full bg-black/50 flex justify-center items-center">
        <form method="POST" action="?/delete">
            <div class="p-4 mx-2 bg-white rounded-lg">
                <h3 class="py-2 text-md font-semibold">Are you sure you want to delete {creditor.name}?</h3>
                <h4 class="py-2 text-sm font-medium">Note: This will permanently delete every credit, payment and item linked to this creditor. This cannot be undone.</h4>
                <div class="grid grid-cols-3 gap-2">
                    <button type="button" class="bg-green-600 text-white font-bold text-center rounded-md col-start-2 py-2" onclick={() => { toggleDeleteConfirmation = false; }}>No</button>
                    <button class="bg-red-600 text-white font-bold text-center rounded-md col-start-3 py-2" onclick={showLoader} type="submit">Yes</button>
                </div>
            </div>
        </form>
    </div>
{/if}

<form method="POST" action="?/update">

    <div class="w-full flex items-center justify-between p-4">
        <label for="name" class="text-lg font-semibold">
            Name:
        </label>
        <input id="name" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" name="name" bind:value={name} required />
    </div>
    <div class="w-full flex items-center justify-between p-4">
        <label for="phone" class="text-lg font-semibold">
            Phone:
        </label>
        <input id="phone" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" name="phone" bind:value={phone} required />
    </div>

    <div class="w-full flex justify-center p-4">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button type="button" class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:shadow-lg" onclick={() => { toggleDeleteConfirmation = true; }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
              <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
            </svg>
            Delete Creditor
        </button>
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 fixed bottom-0 z-10 text-md text-cyan-900 font-semibold" onclick={showLoader} type="submit">Save Changes</button>
</form>

{#if form?.message}
    <p class="text-red-500 p-4 font-semibold w-full text-center text-lg">{form.message}</p>
{/if}

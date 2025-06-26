<script>
    export let form;
</script>

<form method="POST">

    <div class="w-full flex items-center justify-between p-4">
        <label for="amount" class="text-lg font-semibold">
            Amount:
        </label>
        <input id="amount" type="number" step="0.01" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" name="amount" required />
    </div>

    <div class="w-full flex items-center justify-between p-4">
        <label for="method" class="text-lg font-semibold">
            Method:
        </label>
        <select name="method" id="method" class="border-none shadow-md focus:ring-0 focus:shadow-lg rounded-lg w-58" required>
            <option value="CASH">CASH</option>
            <option value="UPI">UPI</option>
            <option value="CARD">CARD</option>
        </select>
    </div>

    <button class="w-full h-[60px] flex justify-evenly items-center bg-slate-50 border-t-1 border-gray-200 absolute bottom-0 z-10 text-md text-cyan-900 font-semibold" type="submit">Submit</button>
</form>

{#if form?.success}
    <p class="text-green-500 p-4 font-semibold w-full text-center text-lg">{form.success}</p>
{/if}
{#if form?.message}
    <p class="text-red-500 p-4 font-semibold w-full text-center text-lg">{form.message}</p>
{/if}
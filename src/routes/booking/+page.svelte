<script lang="ts">
    import DataTable from "$lib/Common/Data_Table/(components)/data-table.svelte";
    import Spinner from "$lib/Common/Data_Table/(components)/spinner.svelte";
    import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
    import { getSchema } from "$lib/Common/Data_Table/(data)/schemas";
    import { z } from "zod";

    let data: any[] = []; // Use a more generic type initially
    let isLoading = true; // Track loading state
    let service_name = 'booking';



    // Determine schema based on service name
    const schema = getSchema(service_name);

    // Define a type variable for inferred data
    type DataType = z.infer<typeof schema>;

    // Fetch data asynchronously, validate and structure it
    _fetch_data("api/get-all-purchase-orders/").then(response => {
    console.log("Raw response data:", response); // Log the raw response

    try {
        // Flatten the response data
        const flattenedData = response.map((item: { purchaseorderbooking: { summary_marks: any; summary_desc: any; no_of_pcs_in_pack: any; status: any; }; }) => ({
            ...item,
            summary_marks: item.purchaseorderbooking?.summary_marks,
            summary_desc: item.purchaseorderbooking?.summary_desc,
            no_of_pcs_in_pack: item.purchaseorderbooking?.no_of_pcs_in_pack,
            status: item.purchaseorderbooking?.status,
        }));

        // Validate the flattened data
        const parsedData = z.array(schema).parse(flattenedData);
        data = parsedData;
    } catch (error) {
        console.error("Data validation failed:", error);
        data = []; // Fallback to an empty array on validation error
    } finally {
        isLoading = false; // Data fetching is complete
    }
});
</script>

<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div>
        <h2 class="text-2xl font-bold text-center tracking-tight">Booking</h2>
    </div>
    <div class="flex items-center justify-between space-y-2">
    </div>
    {#if isLoading}
        <Spinner />
    {:else if data.length === 0}
        <p>No data available</p>
    {:else}
        <DataTable {data} {service_name} />
    {/if}
</div>

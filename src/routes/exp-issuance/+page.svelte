<script lang="ts">
    import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
    import DataTable from "$lib/Common/Data_Table/(components)/data-table.svelte";
    import Spinner from "$lib/Common/Data_Table/(components)/spinner.svelte";
    import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
    import { getSchema } from "$lib/Common/Data_Table/(data)/schemas";
    import { z } from "zod";

    let data: any[] = []; // Use a more generic type initially
    let isLoading = true; // Track loading state
    let service_name = 'exp_issuance';

    // Determine schema based on service name
    const schema = getSchema(service_name);

    // Define a type variable for inferred data
    type DataType = z.infer<typeof schema>;

    // Fetch data asynchronously, validate and structure it
    _fetch_data(urls.exp_issuance.exp_issuance_get_url).then(response => {
        console.log("Raw response data:", response); // Log the raw response

        try {
            // Assume response is an array of objects
            const parsedData = z.array(schema).parse(response) as DataType[];
            data = parsedData;
        } catch (error) {
            console.error("Data validation failed:", error);
            data = []; // Fallback to an empty array on validation error
        } finally {
            isLoading = false; // Data fetching is complete
        }
    });
</script>

<ProtectedRoute>
<div class="md:hidden">
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div>
        <h2 class="text-2xl font-bold text-center tracking-tight">Exp Issuance</h2>
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
</ProtectedRoute>
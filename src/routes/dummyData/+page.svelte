<script lang="ts">
    import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
    import DataTable from "$lib/Common/Data_Table/(components)/data-table.svelte";
    import Spinner from "$lib/Common/Data_Table/(components)/spinner.svelte";
    import { getSchema } from "$lib/Common/Data_Table/(data)/schemas";
    import { z } from "zod";

    // Import the dummy data
    import dummyData from "$lib/Common/Data_Table/(data)/dummyData.json";

    let data: any[] = [];
    let isLoading = true; // Track loading state
    let service_name = 'exp_download';
    
    // Determine schema based on service name
    const schema = getSchema(service_name);

    // Define a type variable for inferred data
    type DataType = z.infer<typeof schema>;

    // Simulate fetching data by using the imported dummy data
    try {
        const parsedData = z.array(schema).parse(dummyData) as DataType[];
        data = parsedData;
    } catch (error) {
        console.error("Data validation failed:", error);
        data = []; // Fallback to an empty array on validation error
    } finally {
        isLoading = false; // Data fetching is complete
    }
</script>

<ProtectedRoute>
    <div class="h-full flex-1 flex-col space-y-8 p-2 mx-8 md:flex">
        <h2 class="text-2xl font-bold text-center tracking-tight">Dummy Data Exp Download</h2>
        {#if isLoading}
            <Spinner />
        {:else if data.length === 0}
            <p>No data available</p>
        {:else}
            <DataTable {data} {service_name} />
        {/if}
    </div>
</ProtectedRoute>

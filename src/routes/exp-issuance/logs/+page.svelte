<script lang="ts">
    import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
    import DataTable from "$lib/Common/Log_Table/(components)/data-table.svelte";
	import Spinner from "$lib/Common/Log_Table/(components)/spinner.svelte";
    import { urls } from "$lib/Common/Rendering_Data/urls.js";
    import { _fetch_data } from "$lib/API/GET";
    import { logSchema, type Log } from "$lib/Common/Log_Table/(data)/schemas";
    import { z } from "zod";

    let data: Log[] = [];
    let isLoading = true; // Track loading state

    console.log('common log url===>', urls.exp_download.common_log_url);

    // Fetch data asynchronously, validate and structure it
    _fetch_data("api/get-activity-logs/exp_issuance").then(response => {
        console.log("Raw response data:", response); // Log the raw response

        try {
            // Validate the data against the schema
            const parsedData = z.array(logSchema).parse(response);
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
<div class="h-full flex-1 flex-col space-y-8 p-8 mx-4 md:flex">
	<div>
		<h2 class="text-2xl font-bold text-center tracking-tight">Exp Download Logs</h2>
	</div>
    <div class="flex items-center justify-between space-y-2">
    </div>
    {#if isLoading}
		<Spinner />
    {:else if data.length === 0}
        <p>No data available</p>
    {:else}
        <DataTable {data} />
    {/if}
</div>
</ProtectedRoute>